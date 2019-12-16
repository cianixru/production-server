import { Injectable } from '@nestjs/common';
import { UserAuthEntity } from '../models/user-auth.entity';
import { UserAuthRepository } from '../repositories/user-auth.repository';

@Injectable()
export class UserAuthService {
    constructor(public readonly userAuthRepository: UserAuthRepository) {}

    async findUser(
        options: Partial<{ uuid: string; login: number }>,
    ): Promise<UserAuthEntity> {
        const queryBuilder = await this.userAuthRepository
            .createQueryBuilder('userAuth')
            .leftJoinAndSelect('userAuth.user', 'user');

        if (options.uuid) {
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
