import { Entity, Column, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { ProductionMachineDto } from '../dto/production-machine.dto';
import { ProductionTaskEntity } from './production-task.entity';

@Entity({ name: 'production_machines' })
export class ProductionMachineEntity extends AbstractEntity<
    ProductionMachineDto
> {
    @Column({ nullable: false })
    public name: string;

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) =>
            productionTask.productionMachine,
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = ProductionMachineDto;
}
