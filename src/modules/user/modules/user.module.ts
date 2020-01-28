import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/modules/auth.module';
import { UserController } from '../controllers/user.controller';
import {
    UserAuthRepository,
    UserRepository,
    UserSalaryRepository,
} from '../repositories';
import { UserAuthService, UserService } from '../services';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            UserRepository,
            UserAuthRepository,
            UserSalaryRepository,
        ]),
    ],
    controllers: [UserController],
    exports: [UserService, UserAuthService],
    providers: [UserService, UserAuthService],
})
export class UserModule {}
