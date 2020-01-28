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
import { AuthGuard } from '../../../guards/auth.guard';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import {
    CustomerDto,
    CustomerRegisterDto,
    CustomersPageDto,
    CustomersPageOptionsDto,
} from '../dto';
import { CustomerService } from '../services/customer.service';

@Controller('customers')
@ApiTags('Customers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@Roles(RoleType.ADMIN)
@ApiBearerAuth()
export class CustomerController {
    constructor(private _customerService: CustomerService) {}

    @Post('/')
    @Roles(RoleType.MASTER, RoleType.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: CustomerDto,
        description: 'Successfully Registered',
    })
    async customerRegister(
        @Body() customerRegisterDto: CustomerRegisterDto,
    ): Promise<CustomerDto> {
        const createdCustomer = await this._customerService.createCustomer(
            customerRegisterDto,
        );

        return createdCustomer.toDto();
    }

    @Get('/')
    @Roles(RoleType.MASTER, RoleType.ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get customers list',
        type: CustomersPageDto,
    })
    getCustomers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: CustomersPageOptionsDto,
    ): Promise<CustomersPageDto> {
        return this._customerService.getCustomers(pageOptionsDto);
    }
}
