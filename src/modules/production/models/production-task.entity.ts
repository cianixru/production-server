import {
    Entity,
    Column,
    JoinColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../common/models/abstract.entity';
import { ProductionTaskDto } from '../dto/production-task.dto';
import { UserEntity } from '../../user/models/user.entity';
import { CustomerEntity } from '../../customer/models/customer.entity';
import { ProductionMachineEntity } from './production-machine.entity';

@Entity({ name: 'production_tasks' })
export class ProductionTaskEntity extends AbstractEntity<ProductionTaskDto> {
    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public quantityPlanned: number;

    @Column({ nullable: false, default: 0 })
    public quantityDone: number;

    @Column('boolean', { nullable: false, default: false })
    public status: boolean;

    @Column({ type: 'time', nullable: false })
    public duration: string;

    @CreateDateColumn({ nullable: false })
    public createdAt: string;

    @ManyToOne(
        () => CustomerEntity,
        (customer: CustomerEntity) => customer.productionTask,
        { nullable: false },
    )
    public customer: CustomerEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.productionTask,
        { nullable: false },
    )
    public user: UserEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.productionTask,
        { nullable: false },
    )
    public master: UserEntity;

    @ManyToOne(
        () => ProductionMachineEntity,
        (productionMachine: ProductionMachineEntity) =>
            productionMachine.productionTask,
        { nullable: false },
    )
    public productionMachine: ProductionMachineEntity;

    dtoClass = ProductionTaskDto;
}
