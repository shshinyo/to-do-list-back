import { Column, Entity } from 'typeorm';
import { TaskStatus } from '../enums/TaskStatus.enum';
import { BaseEntity } from './base/base.entity';

@Entity({ name: 'Task' })
export class Task extends BaseEntity {

    @Column({ type: 'nvarchar', name: 'Status' , default: TaskStatus.TODO })
    Status?: string;

    @Column({ type: 'nvarchar', name: 'Title', nullable: true })
    Title?: string;

    @Column({ type: 'nvarchar', name: 'Description', nullable: true })
    Description?: string;

    @Column({ type: 'nvarchar', name: 'TaskCreator', nullable: true })
    TaskCreator?: string;


    @Column({
        type: 'datetime',
        name: 'CreatedAt',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    CreatedAt?: Date;

    @Column({
        type: 'datetime',
        name: 'UpdatedAt',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    UpdatedAt?: Date;
}
