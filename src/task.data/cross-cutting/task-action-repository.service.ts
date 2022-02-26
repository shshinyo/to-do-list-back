import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { TaskAction } from '../entities/taskaction.entity';

@Injectable()
export class TaskActionRepositoryService {
constructor(
    @InjectRepository(TaskAction) private readonly _taskAction: Repository<TaskAction>,
    ) {
  }

  findById(Id: number): Promise<TaskAction> {
    return this._taskAction.findOne({ where: { Id: Id } });
  }
  findAll(): Promise<TaskAction[]> {
    return this._taskAction.find({});
  }

  insert(entity: TaskAction): Promise<TaskAction> {
    return this._taskAction.save(entity);
  }
  async findByORMQuery(
    TEntityQuery: FindManyOptions<TaskAction>,
  ): Promise<TaskAction[]> {
    return await this._taskAction.find(TEntityQuery);
  }

}
