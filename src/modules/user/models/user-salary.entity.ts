import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm';

import { ContractType } from '../../../common/constants/contract-type';
import { AbstractEntity } from '../../../common/models/abstract.entity';
import { UserSalaryDto } from '../dto';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_salary' })
export class UserSalaryEntity extends AbstractEntity<UserSalaryDto> {
    @Column('decimal', { precision: 13, scale: 2, default: 0, nullable: false })
    public salary: number;

    @Column({
        type: 'enum',
        enum: ContractType,
        default: ContractType.FULL_TIME,
        nullable: false,
    })
    public contractType: ContractType;

    @UpdateDateColumn({ type: 'date' })
    public updatedAt: string;

    @OneToOne(
        () => UserEntity,
        (user: UserEntity) => user.userSalary,
        {
            cascade: true,
            eager: true,
            nullable: false,
        },
    )
    @JoinColumn()
    public user: UserEntity;

    dtoClass = UserSalaryDto;
}
