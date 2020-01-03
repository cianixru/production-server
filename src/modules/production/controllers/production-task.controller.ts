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
    Patch,
    UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleType } from '../../../common/constants/role-type';
import { Roles } from '../../../decorators/roles.decorator';
import { AuthGuard, RolesGuard } from '../../../guards';
import { AuthUserInterceptor } from '../../../interceptors/auth-user-interceptor.service';
import { ProductionTaskService } from '../services/production-task.service';
import { AuthUser } from '../../../decorators/auth-user.decorator';
import { UserAuthEntity } from '../../user/models/user-auth.entity';
import { IFile } from '../../../shared/interfaces/file.interface';
import {
    ProductionTaskDto,
    ProductionTaskUpdateDto,
    ProductionTaskRegisterDto,
    ProductionTasksPageOptionsDto,
    ProductionTasksPageDto,
} from '../dto';
import { ProductionTaskNotFoundException } from '../../../exceptions';

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
        type: ProductionTaskDto,
    })
    @UseInterceptors(FileInterceptor('productionDocumentation'))
    async productionTaskRegister(
        @Body() productionTaskRegisterDto: ProductionTaskRegisterDto,
        @AuthUser() userAuth: UserAuthEntity,
        @UploadedFile() file: IFile,
    ): Promise<ProductionTaskDto> {
        const { user } = userAuth;

        const createdProductionTask = await this._productionTaskService.createProductionTask(
            productionTaskRegisterDto,
            user,
            file,
        );

        return createdProductionTask.toDto();
    }

    @Get('task')
    @Roles(RoleType.Worker)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductionTaskDto,
        description: 'Get task',
    })
    async getProductionTask(
        @AuthUser() userAuth: UserAuthEntity,
    ): Promise<ProductionTaskDto | any> {
        const { user } = userAuth;
        const productionTask = await this._productionTaskService.getTask({
            user,
        });

        if (!productionTask) {
            throw new ProductionTaskNotFoundException();
        }

        return productionTask.toDto();
    }

    @Patch('task')
    @Roles(RoleType.Worker)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ProductionTaskDto,
        description: 'Update task quantity',
    })
    async updateTaskQuantity(
        @Body() productionTaskUpdateDto: ProductionTaskUpdateDto,
    ): Promise<ProductionTaskDto> {
        const { uuid } = productionTaskUpdateDto;
        await this._productionTaskService.updateQuantity(uuid);

        const productionTask = await this._productionTaskService.getTask({
            uuid,
        });
        return productionTask.toDto();
    }
}
