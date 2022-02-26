import { ApiProperty } from "@nestjs/swagger";
import { ActionsTypes } from "../../task.data/enums/actionstypes.enum";
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from "src/task.data/enums/TaskStatus.enum";

export class CreateTaskActionModel{



    @ApiProperty()
    @IsNotEmpty()

    taskId: string; 

    @ApiProperty({type: String, enum: ActionsTypes})
    @IsNotEmpty()
    @IsEnum(ActionsTypes)

    actionType!: ActionsTypes;

    @ApiProperty()
    @IsNotEmpty()

    taskAuditMessage?: string;

}
