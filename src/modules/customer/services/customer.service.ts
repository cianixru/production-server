import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import {
    CustomerRegisterDto,
    CustomersPageDto,
    CustomersPageOptionsDto,
} from '../dto';
import { CustomerEntity } from '../models/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
    constructor(public readonly customerRepository: CustomerRepository) {}

    findCustomer(
        findData: FindConditions<CustomerEntity>,
    ): Promise<CustomerEntity> {
        return this.customerRepository.findOne(findData);
    }

    createCustomer(
        customerRegisterDto: CustomerRegisterDto,
    ): Promise<CustomerEntity> {
        const user = this.customerRepository.create(customerRegisterDto);

        return this.customerRepository.save(user);
    }

    async getCustomers(
        pageOptionsDto: CustomersPageOptionsDto,
    ): Promise<CustomersPageDto> {
        const queryBuilder = this.customerRepository.createQueryBuilder(
            'customer',
        );
        const [customers, customersCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: customersCount,
        });

        return new CustomersPageDto(customers.toDtos(), pageMetaDto);
    }
}
