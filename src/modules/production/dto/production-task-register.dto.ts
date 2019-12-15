'use strict';

import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionTaskRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly quantityDone: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantityPlanned: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    readonly status: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ format: 'time' })
    readonly duration: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly userUuid: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly productionMachineUuid: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly customerUuid: string;
}
