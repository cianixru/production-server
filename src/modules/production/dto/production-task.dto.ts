'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ProductionTaskEntity } from '../models/production-task.entity';
import { CustomerDto } from '../../customer/dto';
import { UserDto } from '../../user/dto';
import { ProductionMachineDto } from './production-machine.dto';
import { ProductionDocumentationDto } from './production-documentation.dto';

export class ProductionTaskDto extends AbstractDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantityPlanned: number;

    @ApiProperty({ default: 0 })
    quantityMade: number;

    @ApiProperty({ type: 'boolean' })
    status: boolean;

    @ApiProperty({ format: 'time' })
    duration: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty({ type: CustomerDto })
    customer: CustomerDto;

    @ApiProperty({ type: UserDto })
    user: UserDto;

    @ApiProperty({ type: UserDto })
    master: UserDto;

    @ApiProperty({ type: ProductionMachineDto })
    productionMachine: ProductionMachineDto;

    @ApiProperty({ type: ProductionDocumentationDto })
    productionDocumentation: string;

    constructor(productionTask: ProductionTaskEntity) {
        super(productionTask);
        this.name = productionTask.name;
        this.quantityPlanned = productionTask.quantityPlanned;
        this.quantityMade = productionTask.quantityMade;
        this.status = productionTask.status;
        this.duration = productionTask.duration;
        this.createdAt = productionTask.createdAt;
        this.customer = productionTask.customer.toDto();
        this.user = productionTask.user.toDto();
        this.master = productionTask.master.toDto();
        this.productionMachine = productionTask.productionMachine.toDto();
        this.productionDocumentation = productionTask.productionDocumentation.toDto();
    }
}
