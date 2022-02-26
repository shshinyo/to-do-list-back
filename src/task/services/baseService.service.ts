import {BadGatewayException, Injectable, Scope } from '@nestjs/common';
import { BaseEntity } from '../../task.data/entities/base/base.entity';
import { IBaseService } from '../contracts/IRepository.baseService';
import { IRepository } from '../contracts/IRepository';


@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T>{
	constructor(private readonly genericRepository: IRepository<T>) {}

  create(entity: T): Promise<number>{
	  try {
		return new Promise<number> ((resolve, reject) => {
			this.genericRepository.insert(entity)
			.then(created=> resolve(created.Id))
			.catch(err => reject(err))
			})
		}
		catch(error) {
			throw new BadGatewayException(error.message);
		}
  }

  getAll(): Promise<T[]> {
	  try {
		return <Promise<T[]>>this.genericRepository.findAll();
	  } catch (error) {
		throw new BadGatewayException(error);
	}
  }

  get(id: number): Promise<T> {
	try {
		  
	} catch (error) {
		throw new BadGatewayException(error.message);
	}
  	return <Promise<T>>this.genericRepository.findById(id);
  }

  delete(id: number) {
	try {
		this.genericRepository.RemoveById(id)
	} catch (error) {
		throw new BadGatewayException(error.message);
	}
  }

  update(entity: T): Promise<T>{
	try {
		return new Promise<T> ((resolve, reject) => {
			this.genericRepository.findById(entity.Id)
			.then(responseGet => {
				try {
					if (responseGet == null) reject('Not existing')
					// let retrievedEntity: T = responseGet as T
					this.genericRepository.insert(entity)
					.then(response => resolve(response))
					.catch(err => reject(err))
				}
				catch(e) {
						reject(e)
				}
			})
			.catch(err => reject(err))
			}) 
	} catch (error) {
		throw new BadGatewayException(error.message);
	}
  }
}