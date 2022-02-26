import {Get, Post, Delete, Put, Body, Param} from '@nestjs/common';
import {ApiBody, ApiResponse } from '@nestjs/swagger';
import { BaseService } from '../task/services/baseService.service';


export class BaseController<T>{

	constructor(private readonly IBaseService: BaseService<T>) {
    }

	@Get()
	@ApiResponse({ status: 200, description: 'Ok'})
	async findAll(): Promise<T[]> {
	  return this.IBaseService.getAll()
	}

	@Get(':id')
	@ApiResponse({ status: 200, description: 'Entity retrieved successfully.'})
	@ApiResponse({ status: 404, description: 'Entity does not exist'})
	async findById(@Param('id') id: number): Promise<T> {
	  return this.IBaseService.get(id)
	}

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiBody({type: Object})
	async create(@Body() entity: T): Promise<number> {
		return this.IBaseService.create(entity);
	}

	@Delete(':id')
	@ApiResponse({ status: 200, description: 'Entity deleted successfully.'})
	@ApiResponse({ status: 400, description: 'Bad Request.'})
	async delete(@Param('id') id: number) {
	  this.IBaseService.delete(id);
	}

	@Put()
	@ApiResponse({ status: 400, description: 'Bad Request.'})
	@ApiResponse({ status: 200, description: 'Entity deleted successfully.'})
    @ApiBody({type: Object})
	async update(@Body() entity: T): Promise<T> {
	  return this.IBaseService.update(entity);
	}

}