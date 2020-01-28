import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from '../modules/auth/services/auth.service';
import { UserAuthEntity } from '../modules/user/models/user-auth.entity';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userAuth = <UserAuthEntity>request.user;

        AuthService.setAuthUser(userAuth);

        return next.handle();
    }
}
