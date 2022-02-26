import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/task.data/entities/task.entity";
import { ITaskRepository } from "src/task/contracts";
import { Repository, FindManyOptions, UpdateResult, DeleteResult, QueryRunner, SelectQueryBuilder } from "typeorm";
import { TaskAction } from "../entities/taskaction.entity";


@Injectable()
export class TaskRepositoryService extends ITaskRepository {
    constructor(
        @InjectRepository(Task) private readonly _task: Repository<Task>,
      ) {
        super();
      }
    
      async findByORMQuery(
        TEntityQuery: FindManyOptions<Task>,
      ): Promise<Task[]> {
        return await this._task.find(TEntityQuery);
      }
    
      findById(Id: number): Promise<Task> {
        return this._task.findOne({ where: { Id: Id } });
      }
      findAll(): Promise<Task[]> {
        return this._task.find({});
      }
    
      insert(entity: Task): Promise<Task> {
        return this._task.save(entity,{transaction:true});
      }
    
      public async updateByCondition(
        Tcondition: Task,
        Tvalues: Task,
      ): Promise<UpdateResult> {
        return await this._task.update(Tcondition, Tvalues);
      }
    
      public async RemoveById(id: number): Promise<DeleteResult> {
        return await this._task.delete({ Id: id });
      }
    
      public async findByQueryBuilder(
        alias?: string,
        queryRunner?: QueryRunner,
      ): Promise<SelectQueryBuilder<Task>> {
        return await this._task.createQueryBuilder(alias, queryRunner);
      }
    }
    

