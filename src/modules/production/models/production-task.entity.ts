import {
    Entity,
    Column,
    JoinColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../common/models/abstract.entity';
import { ProductionMachineHistoryEntity } from './production-machine-history.entity';
import { ProductionTaskDto } from '../dto/production-task.dto';
import { UserEntity } from '../../user/models/user.entity';
import { CustomerEntity } from '../../customer/models/customer.entity';

@Entity({ name: 'production_tasks' })
export class ProductionTaskEntity extends AbstractEntity<ProductionTaskDto> {
    @Column()
    public name: string;

    @Column()
    public quantity: number;

    @Column({ type: 'time', nullable: false })
    public duration: string;

    @CreateDateColumn()
    public createdAt: string;

    @ManyToOne(
        () => CustomerEntity,
        (customer: CustomerEntity) => customer.productionTask,
    )
    public customer: CustomerEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.productionTask,
    )
    public user: UserEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.productionTask,
    )
    public master: UserEntity;

    @OneToMany(
        () => ProductionMachineHistoryEntity,
        (productionMachineHistory: ProductionMachineHistoryEntity) =>
            productionMachineHistory.user,
    )
    public productionMachineHistory: ProductionMachineHistoryEntity[];

    dtoClass = ProductionTaskDto;
}
