import { Entity, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/models/abstract.entity';
import { ProductionMachineHistoryDto } from '../dto/production-machine-history.dto';
import { UserEntity } from '../../../modules/user/models/user.entity';
import { ProductionMachineEntity } from './production-machine.entity';
import { ProductionTaskEntity } from './production-task.entity';

@Entity({ name: 'production_machines_history' })
export class ProductionMachineHistoryEntity extends AbstractEntity<
    ProductionMachineHistoryDto
> {
    @CreateDateColumn()
    public usedAt: string;

    @ManyToOne(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) =>
            productionTask.productionMachineHistory,
    )
    public productionTask: ProductionTaskEntity;

    @ManyToOne(
        () => ProductionMachineEntity,
        (productionMachine: ProductionMachineEntity) =>
            productionMachine.productionMachineHistory,
    )
    public productionMachine: ProductionMachineEntity;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.productionMachineHistory,
    )
    public user: UserEntity;

    dtoClass = ProductionMachineHistoryDto;
}
