'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';

import { ContractType } from '../../../common/constants/contract-type';
import { RoleType } from '../../../common/constants/role-type';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsPhoneNumber('ZZ')
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly street: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly state: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly zipCode: string;

    @IsEnum(RoleType)
    @IsOptional()
    @ApiPropertyOptional({ enum: RoleType })
    readonly role: RoleType;

    @IsString()
    @MinLength(6)
    @IsOptional()
    @ApiPropertyOptional()
    readonly password: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly salary: number;

    @IsEnum(ContractType)
    @IsOptional()
    @ApiProperty({ enum: ContractType })
    readonly contractType: ContractType;
}
