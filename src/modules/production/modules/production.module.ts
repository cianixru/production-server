import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerModule } from '../../../modules/customer/modules/customer.module';
import { UserModule } from '../../../modules/user/modules/user.module';
import { AuthModule } from '../../auth/modules/auth.module';
import { ProductionMachineController } from '../controllers/production-machine.controller';
import { ProductionTaskController } from '../controllers/production-task.controller';
import { ProductionGateway } from '../gateway/production.gateway';
import { ProductionDocumentationRepository } from '../repositories/production-documentations.repository';
import { ProductionMachineRepository } from '../repositories/production-machine.repository';
import { ProductionTaskRepository } from '../repositories/production-task.repository';
import { ProductionMachineService } from '../services/production-machine.service';
import { ProductionTaskService } from '../services/production-task.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ProductionTaskRepository,
            ProductionMachineRepository,
            ProductionDocumentationRepository,
        ]),
        UserModule,
        CustomerModule,
    ],
    controllers: [ProductionMachineController, ProductionTaskController],
    exports: [ProductionMachineService, ProductionTaskService],
    providers: [
        ProductionMachineService,
        ProductionTaskService,
        ProductionGateway,
    ],
})
export class ProductionModule {}
