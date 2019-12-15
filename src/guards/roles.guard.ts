import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../modules/user/models/user.entity';
import { UserAuthEntity } from 'modules/user/models/user-auth.entity';
import { UserAuthDto } from 'modules/user/dto/user-auth.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const {
            userAuth: { role },
        } = <UserEntity>request.user;

        return roles.includes(role);
    }
}
