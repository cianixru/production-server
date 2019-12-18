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
import { AuthGuard, RolesGuard } from '../../../guards';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { ProductionMachineService } from '../services/production-machine.service';
import {
    ProductionMachineRegisterDto,
    ProductionMachineDto,
    ProductionMachinesPageDto,
    ProductionMachinesPageOptionsDto,
} from '../dto';

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
