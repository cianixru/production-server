import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '../../../shared/services/config.service';
import { UserAuthService } from '../../user/services/user-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        public readonly configService: ConfigService,
        public readonly userAuthService: UserAuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate({ iat, exp, uuid }) {
        const timeDiff = exp - iat;

        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }

        const userAuth = await this.userAuthService.findUser({ uuid });

        if (!userAuth) {
            throw new UnauthorizedException();
        }

        return userAuth;
    }
}
