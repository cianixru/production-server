import {
    Entity,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { UserDto } from '../dto/user.dto';
import { UserAuthEntity } from './user-auth.entity';
import { UserSalaryEntity } from './user-salary.entity';
import { ProductionMachineHistoryEntity } from '../../production/models/production-machine-history.entity';
import { ProductionTaskEntity } from '../../production/models/production-task.entity';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

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

    @CreateDateColumn({ type: 'date' })
    public createdAt: string;

    @Column('timestamp with time zone', { nullable: true })
    public lastLogin: string;

    @Column('timestamp with time zone', { nullable: true })
    public lastLogout: string;

    @OneToOne(
        () => UserAuthEntity,
        (userAuth: UserAuthEntity) => userAuth.user,
    )
    public userAuth: UserAuthEntity;

    @OneToOne(
        () => UserSalaryEntity,
        (userSalary: UserSalaryEntity) => userSalary.user,
    )
    public userSalary: UserSalaryEntity;

    @OneToMany(
        () => ProductionMachineHistoryEntity,
        (productionMachineHistory: ProductionMachineHistoryEntity) =>
            productionMachineHistory.user,
    )
    public productionMachineHistory: ProductionMachineHistoryEntity[];

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) => productionTask.user,
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = UserDto;
}
