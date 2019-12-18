import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService, UserAuthService } from '../services';
import { UserController } from '../controllers/user.controller';
import { AuthModule } from '../../auth/modules/auth.module';
import {
    UserRepository,
    UserAuthRepository,
    UserSalaryRepository,
} from '../repositories';

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
