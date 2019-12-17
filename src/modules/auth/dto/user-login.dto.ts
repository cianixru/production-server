'use strict';

import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserLoginDto {
    @IsNumber()
    @ApiProperty()
    readonly login: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly password: string;
}
