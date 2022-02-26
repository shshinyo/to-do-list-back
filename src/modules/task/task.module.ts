import { HttpModule } from '@nestjs/axios';
import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskActionRepositoryService } from 'src/task.data/cross-cutting/task-action-repository.service';
import { TaskRepositoryService } from 'src/task.data/cross-cutting/task-repository.service';
import { Task } from 'src/task.data/entities/task.entity';
import { TaskAction } from 'src/task.data/entities/taskaction.entity';
import { TaskController } from 'src/task.rest/task.controller';
import { IRepository, ITaskRepository } from 'src/task/contracts';
import { ITaskActionRepository } from 'src/task/contracts/IRepository.taskAction';
import { BaseService } from 'src/task/services/BaseService.service';
import { TaskService } from 'src/task/services/task.service';
import { Repository } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task,TaskAction]),HttpModule],
      controllers: [TaskController],
      providers: [TaskService,Repository,
        TaskActionRepositoryService,
        {provide:ITaskRepository,useClass:TaskRepositoryService},
        {provide:ITaskActionRepository,useClass:TaskActionRepositoryService}
    ],
    exports:[Repository]
})
export class TaskModule {}
