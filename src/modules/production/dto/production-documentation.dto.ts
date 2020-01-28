'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProductionDocumentationEntity } from '../models/production-documentation.entity';

export class ProductionDocumentationDto extends AbstractDto {
    @ApiProperty({ format: 'binary' })
    name: string;

    constructor(productionDocumentation: ProductionDocumentationEntity) {
        super(productionDocumentation);
        this.name = productionDocumentation.name;
    }
}
