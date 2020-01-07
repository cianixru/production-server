import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';
import { CustomerRepository } from '../repositories/customer.repository';
import { SharedModule } from '../../../shared/modules/shared.module';
import { ConfigService } from '../../../shared/services/config.service';

describe('CustomerController', () => {
    let module: TestingModule;
    let customerController: CustomerController;
    // let customerService: CustomerService;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [CustomerService],
            imports: [
                TypeOrmModule.forRootAsync({
                    useFactory: (configService: ConfigService) =>
                        configService.typeOrmConfig,
                    imports: [SharedModule],
                    inject: [ConfigService],
                }),
                TypeOrmModule.forFeature([CustomerRepository]),
            ],
        }).compile();

        // customerService = module.get<CustomerService>(CustomerService);
        customerController = module.get<CustomerController>(CustomerController);
    });

    it('should be defined', () => {
        expect(customerController).toBeDefined();
    });
});
