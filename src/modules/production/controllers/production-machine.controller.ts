'use strict';

import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { Roles } from '../../../decorators/roles.decorator';
import { AuthGuard, RolesGuard } from '../../../guards';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import {
    ProductionMachineDto,
    ProductionMachineRegisterDto,
    ProductionMachinesPageDto,
    ProductionMachinesPageOptionsDto,
} from '../dto';
import { ProductionMachineService } from '../services/production-machine.service';

@Controller('production')
@ApiTags('Production')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ProductionMachineController {
    constructor(private _productionMachineService: ProductionMachineService) {}

    @Get('machines')
    @Roles(RoleType.MASTER, RoleType.ADMIN)
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
    @Roles(RoleType.MASTER, RoleType.ADMIN)
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
