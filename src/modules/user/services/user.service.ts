import { Injectable } from '@nestjs/common';
import { FindConditions, UpdateResult } from 'typeorm';
import { UserRegisterDto } from '../../auth/dto';
import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { UsersPageDto, UsersPageOptionsDto } from '../dto';
import {
    UserRepository,
    UserAuthRepository,
    UserSalaryRepository,
} from '../repositories';
import { format } from 'date-fns';
import { UserEntity, UserAuthEntity, UserSalaryEntity } from '../models';

@Injectable()
export class UserService {
    dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

    constructor(
        public readonly userRepository: UserRepository,
        public readonly userAuthRepository: UserAuthRepository,
        public readonly userSalaryRepository: UserSalaryRepository,
    ) {}

    findUser(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }

    async createUser(
        userRegisterDto: UserRegisterDto,
    ): Promise<[UserEntity, UserAuthEntity, UserSalaryEntity]> {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);

        const createdUser = {
            ...userRegisterDto,
            user,
        };
        const userAuth = this.userAuthRepository.create(createdUser);
        const userSalary = this.userSalaryRepository.create(createdUser);

        await Promise.all([
            this.userAuthRepository.save(userAuth),
            this.userSalaryRepository.save(userSalary),
        ]);

        return [user, userAuth, userSalary];
    }

    async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const [users, usersCount] = await queryBuilder
            .leftJoinAndSelect('user.userAuth', 'userAuth')
            .leftJoinAndSelect('user.userSalary', 'userSalary')
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: usersCount,
        });

        return new UsersPageDto(users.toDtos(), pageMetaDto);
    }

    async setLastLoginDate(user: UserEntity): Promise<UpdateResult> {
        const { id } = user;
        const today = new Date();

        const queryBuilder = await this.userRepository
            .createQueryBuilder('user')
            .update(UserEntity)
            .set({ lastLogin: format(today, this.dateFormat) })
            .where('id = :id', { id });

        return queryBuilder.execute();
    }

    async setLastLogoutDate(user: UserEntity): Promise<UpdateResult> {
        const { id } = user;
        const today = new Date();

        const queryBuilder = await this.userRepository
            .createQueryBuilder('user')
            .update(UserEntity)
            .set({ lastLogout: format(today, this.dateFormat) })
            .where('id = :id', { id });

        return queryBuilder.execute();
    }
}
