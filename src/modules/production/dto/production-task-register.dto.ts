'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class ProductionTaskRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly quantityPlanned: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    readonly quantityMade: number;

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

    @ApiProperty({ format: 'binary' })
    readonly productionDocumentation: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly customerUuid: string;
}
