import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../auth/modules/auth.module';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerService } from '../services/customer.service';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([CustomerRepository]),
    ],
    controllers: [CustomerController],
    exports: [CustomerService],
    providers: [CustomerService],
})
export class CustomerModule {}
