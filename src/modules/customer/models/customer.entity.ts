import { Entity, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { CustomerDto } from '../dto/customer.dto';
import { ProductionTaskEntity } from '../../production/models/production-task.entity';

@Entity({ name: 'customers' })
export class CustomerEntity extends AbstractEntity<CustomerDto> {
    @Column()
    public name: string;

    @Column({ unique: true })
    public email: string;

    @Column()
    public phone: string;

    @Column()
    public street: string;

    @Column()
    public city: string;

    @Column()
    public state: string;

    @Column()
    public zip: string;

    @Column()
    public tax: string;

    @CreateDateColumn({ type: 'date' })
    public createdAt: string;

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) => productionTask.customer,
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = CustomerDto;
}
