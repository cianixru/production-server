'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductionTaskUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly uuid: string;
}
