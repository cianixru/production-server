import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UseGuards,
    Patch,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from '../../../decorators/auth-user.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { UserAuthEntity } from '../../user/models/user-auth.entity';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import {
    RegisterPayloadDto,
    UserRegisterDto,
    UserLoginDto,
    LoginPayloadDto,
} from '../dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const userAuthEntity = await this.authService.validateUser(
            userLoginDto,
        );

        const [token] = await Promise.all([
            this.authService.createToken(userAuthEntity),
            this.userService.setLastLoginDate(userAuthEntity),
        ]);

        return new LoginPayloadDto(token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: RegisterPayloadDto,
        description: 'Successfully Registered',
    })
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<RegisterPayloadDto> {
        const [
            createdUser,
            createdUserAuth,
            createdUserSalary,
        ] = await this.userService.createUser(userRegisterDto);

        return new RegisterPayloadDto(
            createdUser.toDto(),
            createdUserAuth.toDto(),
            createdUserSalary.toDto(),
        );
    }

    @Patch('logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Successfully logout',
    })
    async userLogout(@AuthUser() userAuth: UserAuthEntity): Promise<void> {
        const { user } = userAuth;
        await this.userService.setLastLogoutDate(user);
    }
}
