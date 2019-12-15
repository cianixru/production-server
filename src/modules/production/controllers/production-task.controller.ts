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
import { ProductionTaskService } from '../services/production-task.service';
import { ProductionTasksPageDto } from '../dto/production-tasks-page.dto';
import { ProductionTasksPageOptionsDto } from '../dto/production-tasks-page-options.dto';
import { AuthUser } from 'decorators/auth-user.decorator';
import { UserEntity } from 'modules/user/models/user.entity';
import { ProductionTaskDto } from '../dto/production-task.dto';
import { ProductionTaskEntity } from '../models/production-task.entity';
import { ProductionTaskRegisterDto } from '../dto/production-task-register.dto';

@Controller('production')
@ApiTags('Production')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ProductionTaskController {
    constructor(private _productionTaskService: ProductionTaskService) {}

    @Get('tasks')
    @Roles(RoleType.Master, RoleType.Admin)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get production tasks list',
        type: ProductionTasksPageDto,
    })
    getProductionTasks(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: ProductionTasksPageOptionsDto,
    ): Promise<ProductionTasksPageDto> {
        return this._productionTaskService.getTasks(pageOptionsDto);
    }

    @Post('tasks')
    @Roles(RoleType.Master, RoleType.Admin)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Register production task',
        type: ProductionTaskRegisterDto,
    })
    async productionTaskRegister(
        @Body() productionTaskRegisterDto: ProductionTaskRegisterDto,
        @AuthUser() master: UserEntity,
    ): Promise<ProductionTaskDto> {
        const createdProductionTask = await this._productionTaskService.createProductionTask(
            productionTaskRegisterDto,
            master,
        );

        return;

        // return createdProductionTask.toDto();
    }

    @Get('task')
    @Roles(RoleType.Worker)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductionTaskDto,
        description: 'Get task',
    })
    getProductionTask(
        @AuthUser() user: UserEntity,
    ): Promise<ProductionTaskDto | undefined> {
        return this._productionTaskService.getTask(user);
    }
}
