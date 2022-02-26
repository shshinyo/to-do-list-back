import { Injectable, OnModuleInit } from '@nestjs/common';
import { Task } from '../../task.data/entities/task.entity';
import { Between, FindManyOptions, In, IsNull, LessThan, Like, Not, UpdateResult, } from 'typeorm';
import {
      ITaskRepository,
      ITaskActionRepository
} from '../contracts';
import { TaskStatus } from '../../task.data/enums/TaskStatus.enum';
import { BaseService } from './BaseService.service';
import { CreateTaskModel } from 'src/task.common/models/task.model';
import { Result } from 'src/utilities/result.model';
import { ErrorCodes } from 'src/task.data/enums/error.codes.enum';
import { StatusTransition } from '../contracts/statusTransitions.interface';
import { SuccessCodes } from 'src/task.data/enums/success.codes.enum';
import { ActionsTypes } from 'src/task.data/enums/actionstypes.enum';

@Injectable()
export class TaskService extends BaseService<Task>{

      constructor(
            private readonly _taskRepository: ITaskRepository,
            private readonly _taskActionRepository: ITaskActionRepository
      ) {
            super(_taskRepository);
      }

      async getTask(taskId) {
            try {
                  let task = await this._taskRepository.findById(taskId);              
                  if (task && task.Id) {
                        return new Result().setData(task, 200)
                  } else {
                        return new Result().addError(ErrorCodes.NOT_FOUND, "Task Not Found ");
                  }
            } catch (error) {
                  throw new Error(error.message);
            }
      }
      async createTask(model: CreateTaskModel) {
            try {
                  model.Status = TaskStatus.TODO;
                  let task = await this._taskRepository.insert(model);

                  if (task.Id) {
                        await this.addNewAction(ActionsTypes.CREATE, task)
                        return new Result().setData(task, 200)
                  } else {
                        return new Result().addError(ErrorCodes.INVALID_INPUNT, "Task Missing Parameters ");
                  }

            } catch (error) {
                  throw new Error(error.message);
            }
      }
      async getTaskActions(taskId) {
            try {
                  let actions = await this._taskActionRepository.findByORMQuery({
                        where: {
                              taskId
                         }
                  });
                  return new Result().setData(actions, 200)
            } catch (error) {
                  throw new Error(error.message);
            }

      }
      async updateTaskCreator(model) {
            try {
                  console.log(model)
                  const { id, ...updateInfo } = model;
                  let task = await this._taskRepository.findById(id);
                  if (!task) return new Result().addError(ErrorCodes.NOT_FOUND, "Task is not Found");
                  let result = await this._taskRepository.updateByCondition({ Id: id }, { ...updateInfo });
                  if (result.affected > 0) {
                       await this.addNewAction(ActionsTypes.UPDATE_OWNER, task, updateInfo)
                        return new Result().setData(SuccessCodes.DONE, 200)
                  }
                  new Result().addError(ErrorCodes.NOT_FOUND, "Task is not Found");
            } catch (error) {
                  throw new Error(error.message);
            }
      }
      async updateTaskStatus(taskId, newStatus) {
            try {
                  let task = await this._taskRepository.findById(taskId);
                  if (!task) return new Result().addError(ErrorCodes.NOT_FOUND, "Task is not Found");
                  let statusChangeable = this.checkIfAcceptedStatusChange(task, newStatus);
                  if (!statusChangeable) return new Result().addError(ErrorCodes.NOT_FOUND, "BAD STATUS TRANSITIONS");
                  let result = await this._taskRepository.updateByCondition({ Id: taskId }, { Status:newStatus });
                  if (result.affected > 0) {
                        this.addNewAction(ActionsTypes.UPDATE_STATUS, task, newStatus);
                        return new Result().setData(SuccessCodes.DONE, 200)
                  }
                  return new Result().setData(SuccessCodes.DONE, 201);
            } catch (error) {
                  throw new Error(error.message);
            }
      }

      private checkIfAcceptedStatusChange(task: Task, newStatus: TaskStatus): boolean {
            let statusTransitions: StatusTransition = {
                  ToDo: [TaskStatus.IN_PROGRESS],
                  InProgress: [TaskStatus.BLOCKED, TaskStatus.IN_QA],
                  Blocked: [TaskStatus.TODO],
                  InQA: [TaskStatus.TODO, TaskStatus.DONE],
                  Done: [TaskStatus.DEPLOYED],
                  Deployed: []
            }
            let status = statusTransitions[task.Status].includes(newStatus);
            return status;
      }
      private async addNewAction(taskType: ActionsTypes, task: Task, taskChange?) {
            if (taskType == ActionsTypes.CREATE) {
                  let message = `Task created with with owner ${task.TaskCreator} `;
                  let action = { taskId: task.Id, taskAuditMessage: message, actionType: ActionsTypes.CREATE }
                  await this._taskActionRepository.insert(action)
            } else if (taskType == ActionsTypes.UPDATE_STATUS) {
                  let message = `Task status updated from ${task.Status} to ${taskChange} `;
                  let action = { taskId: task.Id, taskAuditMessage: message, actionType: ActionsTypes.UPDATE_STATUS }
                  await this._taskActionRepository.insert(action)
            } else if (taskType == ActionsTypes.UPDATE_OWNER) {
                  let message = `Task owner updated from ${task.TaskCreator} to ${taskChange.TaskCreator} `;
                  let action = { taskId: task.Id, taskAuditMessage: message, actionType: ActionsTypes.UPDATE_OWNER }
                  await this._taskActionRepository.insert(action)
            }

      }
}

