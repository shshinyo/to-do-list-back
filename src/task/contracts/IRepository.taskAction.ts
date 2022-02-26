import { Injectable } from "@nestjs/common";
import { TaskAction } from "src/task.data/entities/taskaction.entity";
import { DeleteResult, FindConditions, FindManyOptions, QueryRunner, SelectQueryBuilder, UpdateResult } from "typeorm";
import { IRepository } from "./IRepository";


@Injectable()
export abstract class ITaskActionRepository implements IRepository<TaskAction>{

    abstract findById(Id: number): Promise<TaskAction> ;

    abstract findAll(): Promise<TaskAction[]> ;

    abstract insert(entity: TaskAction): Promise<TaskAction> ;

    abstract findByORMQuery(TEntityQuery: FindManyOptions<TaskAction>): Promise<TaskAction[]> ;
    
    abstract updateByCondition(Tcondition: TaskAction | FindConditions<TaskAction>, Tvalues: TaskAction): Promise<UpdateResult> ;

    abstract RemoveById(id: number): Promise<DeleteResult>;

    abstract findByQueryBuilder(alias?: string,queryRunner?: QueryRunner): Promise<SelectQueryBuilder<TaskAction>>;
    
 
}