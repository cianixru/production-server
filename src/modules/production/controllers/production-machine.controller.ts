'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    Post,
    Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { Roles } from '../../../decorators/roles.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { ProductionMachinesPageOptionsDto } from '../dto/production-machines-page-options.dto';
import { ProductionMachinesPageDto } from '../dto/production-machines-page.dto';
import { ProductionMachineService } from '../services/production-machine.service';
import { ProductionMachineDto } from '../dto/production-machine.dto';
import { ProductionMachineRegisterDto } from '../dto/production-machine-register.dto';

@Controller('production')
@ApiTags('Production')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ProductionMachineController {
    constructor(private _productionMachineService: ProductionMachineService) {}

    @Get('machines')
    @Roles(RoleType.Master, RoleType.Admin)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get machines list',
        type: ProductionMachinesPageDto,
    })
    productionMachines(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ProductionMachinesPageOptionsDto,
    ): Promise<ProductionMachinesPageDto> {
        return this._productionMachineService.getMachines(pageOptionsDto);
    }

    @Post('machines')
    @Roles(RoleType.Master, RoleType.Admin)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductionMachineDto,
        description: 'Successfully Registered',
    })
    async productionMachineRegister(
        @Body() productionMachineRegisterDto: ProductionMachineRegisterDto,
    ): Promise<ProductionMachineDto> {
        const createdMachine = await this._productionMachineService.createMachine(
            productionMachineRegisterDto,
        );

        return createdMachine.toDto();
    }
}
