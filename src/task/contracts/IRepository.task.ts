import { Injectable } from "@nestjs/common";
import { DeleteResult, FindConditions, FindManyOptions, InsertResult, QueryRunner, SelectQueryBuilder, UpdateResult } from "typeorm";
import { Task } from "../../task.data/entities/task.entity";
import { IRepository } from "./IRepository";


@Injectable()
export abstract class ITaskRepository implements IRepository<Task>{

    abstract findById(Id: number): Promise<Task> ;

    abstract findAll(): Promise<Task[]> ;

    abstract insert(entity: Task): Promise<Task> ;

    abstract findByORMQuery(TEntityQuery: FindManyOptions<Task>): Promise<Task[]> ;
    
    abstract updateByCondition(Tcondition: Task | FindConditions<Task>, Tvalues: Task): Promise<UpdateResult> ;

    abstract RemoveById(id: number): Promise<DeleteResult>;

    abstract findByQueryBuilder(alias?: string,queryRunner?: QueryRunner): Promise<SelectQueryBuilder<Task>>;

}