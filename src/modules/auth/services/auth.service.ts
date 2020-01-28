import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../../exceptions/user-not-found.exception';
import { UserPasswordNotValidException } from '../../../exceptions/user-password-not-valid.exception';
import { ContextService } from '../../../providers/services/context.service';
import { UtilsService } from '../../../providers/services/utils.service';
import { ConfigService } from '../../../shared/services/config.service';
import { UserAuthEntity } from '../../user/models/user-auth.entity';
import { UserAuthService } from '../../user/services/user-auth.service';
import { UserService } from '../../user/services/user.service';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
        public readonly userAuthService: UserAuthService,
    ) {}

    async createToken(userAuth: UserAuthEntity): Promise<TokenPayloadDto> {
        const {
            user: { uuid },
            role,
        } = userAuth;

        return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({ uuid, role }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserAuthEntity> {
        const { login, password } = userLoginDto;
        const userAuth = await this.userAuthService.findUser({ login });

        const isPasswordValid = await UtilsService.validateHash(
            userAuth && userAuth.password,
            password && password,
        );

        if (!userAuth) {
            throw new UserNotFoundException();
        }

        if (userAuth.password && !isPasswordValid) {
            throw new UserPasswordNotValidException();
        }

        return userAuth;
    }

    static setAuthUser(userAuth: UserAuthEntity) {
        ContextService.set(AuthService._authUserKey, userAuth);
    }

    static getAuthUser(): UserAuthEntity {
        return ContextService.get(AuthService._authUserKey);
    }
}
