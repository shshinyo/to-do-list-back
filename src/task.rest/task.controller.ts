import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import {  CreateTaskModel} from '../task.common/models/task.model';
import { TaskService } from '../task/services/task.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { Task } from '../task.data/entities/task.entity';
import { TaskStatus } from '../task.data/enums/TaskStatus.enum';
import { Result } from 'src/utilities/result.model';
import { IsEnum, IsNumber } from 'class-validator';
import { UpdateTaskModel } from 'src/task.common/models/updateTask.model';
import { CreateTaskActionModel } from 'src/task.common/models/taskAction.model';

@Controller('task')
@ApiTags('task')
export class TaskController{
   constructor(private readonly _taskService: TaskService) {
      
   }
   @Get('getTask')
   @ApiQuery({ name:'TaskId'})
   public async getTask(@Query('TaskId') TaskId: number): Promise<Result<Task | string>> {
      return await this._taskService.getTask(TaskId);
   }
   
   @Post('createTask')
   public async createTask(@Body() task: CreateTaskModel): Promise<Result<Task | string>> {
      return await this._taskService.createTask(task);
   }

   @Put('updateTaskCreator')
   public async updateTask(@Body() model: UpdateTaskModel): Promise<Result<any>> {
      return await this._taskService.updateTaskCreator(model);
   }

   @Put('updateTaskStatus')
   @ApiQuery({ name: 'Status', enum: TaskStatus })
   public async updateTaskStatus(@Query('TaskId') TaskId: number,
   @Query('Status') Status: TaskStatus): Promise<Result<any>> {
      return await this._taskService.updateTaskStatus(TaskId,Status);
   }

   @Get('getTaskActions')
   @ApiQuery({ name: 'TaskId', })
   public async getTaskActions(@Query('TaskId') TaskId: number): Promise<Result<any>> {
      return await this._taskService.getTaskActions(TaskId);
   }
}