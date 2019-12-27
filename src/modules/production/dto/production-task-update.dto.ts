'use strict';

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionTaskUpdateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly uuid: string;
}
