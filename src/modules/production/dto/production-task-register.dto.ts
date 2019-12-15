'use strict';

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionTaskRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;

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
