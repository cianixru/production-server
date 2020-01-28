'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

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

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly taxNumber: string;
}
