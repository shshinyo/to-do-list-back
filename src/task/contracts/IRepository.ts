import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from "typeorm";

export interface IRepository<T>{

    findById(Id: number):Promise<T>;

    findAll():Promise<T[]>;

    insert(entity:T):Promise<T>;

    /**
     * 
     * @param TEntityQuery is a predicate to build query dynamically
     */
    findByORMQuery(TEntityQuery: FindManyOptions<T>): Promise<T[]>;

    updateByCondition(Tcondition:T | FindConditions<T>,Tvalues:T):Promise<UpdateResult>;
    
    RemoveById(id: number):Promise<DeleteResult>;

}