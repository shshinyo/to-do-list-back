import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity({ name: 'TaskAction' })
export class TaskAction extends BaseEntity {

    @Column({ type: 'int', name: 'taskId', nullable: false })
    taskId?: number;

    @Column({ type: 'nvarchar', name: 'actionType', nullable: false })
    actionType?: string;

    @Column({ type: 'nvarchar', name: 'taskAuditMessage'})
    taskAuditMessage?: string;
    
    @Column({
        type: 'datetime',
        name: 'actionDate',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    actionDate?: Date;

}
