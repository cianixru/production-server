import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/modules/auth.module';
import { ProductionMachineRepository } from '../repositories/production-machine.repository';
import { ProductionTaskRepository } from '../repositories/production-task.repository';
import { ProductionMachineController } from '../controllers/production-machine.controller';
import { ProductionMachineService } from '../services/production-machine.service';
import { ProductionTaskService } from '../services/production-task.service';
import { ProductionTaskController } from '../controllers/production-task.controller';
import { UserService } from '../../user/services/user.service';
import { CustomerService } from '../../customer/services/customer.service';
import { UserModule } from 'modules/user/modules/user.module';
import { CustomerModule } from 'modules/customer/modules/customer.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([
            ProductionTaskRepository,
            ProductionMachineRepository,
        ]),
        UserModule,
        CustomerModule,
    ],
    controllers: [ProductionMachineController, ProductionTaskController],
    exports: [ProductionMachineService, ProductionTaskService],
    providers: [ProductionMachineService, ProductionTaskService],
})
export class ProductionModule {}
