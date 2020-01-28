'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
    @IsNumber()
    @ApiProperty()
    readonly login: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly password: string;
}
