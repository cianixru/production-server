import { Entity, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { CustomerDto } from '../dto/customer.dto';
import { ProductionTaskEntity } from '../../production/models/production-task.entity';

@Entity({ name: 'customers' })
export class CustomerEntity extends AbstractEntity<CustomerDto> {
    @Column({ nullable: false })
    public name: string;

    @Column({ unique: true, nullable: false })
    public email: string;

    @Column()
    public phone: string;

    @Column({ nullable: false })
    public street: string;

    @Column({ nullable: false })
    public city: string;

    @Column({ nullable: false })
    public state: string;

    @Column({ nullable: false })
    public zipCode: string;

    @Column({ nullable: false })
    public taxNumber: string;

    @CreateDateColumn({ type: 'date' })
    public createdAt: string;

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) => productionTask.customer,
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = CustomerDto;
}
