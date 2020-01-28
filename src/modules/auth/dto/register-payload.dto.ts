'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { UserAuthDto } from '../../user/dto/user-auth.dto';
import { UserSalaryDto } from '../../user/dto/user-salary.dto';
import { UserDto } from '../../user/dto/user.dto';

export class RegisterPayloadDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;

    @ApiProperty({ type: UserAuthDto })
    userAuth: UserAuthDto;

    @ApiProperty({ type: UserSalaryDto })
    userSalary: UserSalaryDto;

    constructor(
        user: UserDto,
        userAuth: UserAuthDto,
        userSalary: UserSalaryDto,
    ) {
        this.user = user;
        this.userAuth = userAuth;
        this.userSalary = userSalary;
    }
}
