
import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from "src/task.data/enums/TaskStatus.enum";

export class UpdateTaskModel{

    @ApiProperty()
    @IsNotEmpty()

    id: string; 

    @ApiProperty()
    @IsNotEmpty()

    TaskCreator?: string;

}
