import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { RoleType } from '../../../common/constants/role-type';
import { UserAuthDto } from '../dto/user-auth.dto';
import { PasswordTransformer } from '../utils/password.transformer';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_auth' })
export class UserAuthEntity extends AbstractEntity<UserAuthDto> {
    @Column({ type: 'enum', enum: RoleType, default: RoleType.Worker })
    role: RoleType;

    @PrimaryGeneratedColumn('increment')
    @Column({ unique: true, nullable: false })
    login: number;

    @Column({ nullable: true, transformer: new PasswordTransformer() })
    password: string;

    @OneToOne(
        () => UserEntity,
        (user: UserEntity) => user.userAuth,
        {
            cascade: true,
            eager: true,
            nullable: false,
        },
    )
    @JoinColumn()
    public user: UserEntity;

    dtoClass = UserAuthDto;
}
