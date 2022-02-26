import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../../task.data/enums/TaskStatus.enum";
import { IsEmail, IsNotEmpty,IsEnum } from 'class-validator';

export class CreateTaskModel{

    Status: TaskStatus ;

    @ApiProperty()
    @IsNotEmpty()

    Title?: string;

    @ApiProperty()
    @IsNotEmpty()

    Description:string;

    @ApiProperty()
    @IsNotEmpty()

    TaskCreator:string

}
