import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserAuthEntity } from '../models/user-auth.entity';
import { UserAuthRepository } from '../repositories/user-auth.repository';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserAuthService {
    constructor(public readonly userAuthRepository: UserAuthRepository) {}

    findUser(
        options: Partial<{ uuid: string; login: number }>,
    ): Promise<UserAuthEntity> {
        const queryBuilder = this.userAuthRepository.createQueryBuilder(
            'userAuth',
        );

        if (options.uuid) {
            queryBuilder.leftJoinAndSelect('userAuth.user', 'user');
            queryBuilder.orWhere('user.uuid = :uuid', {
                uuid: options.uuid,
            });
        }

        if (options.login) {
            queryBuilder.orWhere('userAuth.login = :login', {
                login: options.login,
            });
        }

        return queryBuilder.getOne();
    }
}
