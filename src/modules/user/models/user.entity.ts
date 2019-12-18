import { Entity, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { UserDto } from '../dto';
import { UserAuthEntity } from './user-auth.entity';
import { UserSalaryEntity } from './user-salary.entity';
import { ProductionTaskEntity } from '../../production/models/production-task.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ nullable: false })
    public firstName: string;

    @Column({ nullable: false })
    public lastName: string;

    @Column({ unique: true, nullable: false })
    public email: string;

    @Column({ nullable: false })
    public phone: string;

    @Column({ nullable: false })
    public street: string;

    @Column({ nullable: false })
    public city: string;

    @Column({ nullable: false })
    public state: string;

    @Column({ nullable: false })
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
        { nullable: false },
    )
    public userAuth: UserAuthEntity;

    @OneToOne(
        () => UserSalaryEntity,
        (userSalary: UserSalaryEntity) => userSalary.user,
        { nullable: false },
    )
    public userSalary: UserSalaryEntity;

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) => productionTask.user,
        { nullable: false },
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = UserDto;
}
