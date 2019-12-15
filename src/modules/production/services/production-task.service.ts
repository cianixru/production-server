import { Injectable } from '@nestjs/common';
import { PageMetaDto } from 'common/dto/page-meta.dto';
import { ProductionTaskRepository } from '../repositories/production-task.repository';
import { ProductionTasksPageOptionsDto } from '../dto/production-tasks-page-options.dto';
import { ProductionTasksPageDto } from '../dto/production-tasks-page.dto';
import { UserEntity } from '../../user/models/user.entity';
import { FindConditions } from 'typeorm';
import { ProductionTaskDto } from '../dto/production-task.dto';
import { ProductionTaskRegisterDto } from '../dto/production-task-register.dto';
import { UserService } from '../../user/services/user.service';
import { CustomerService } from '../../customer/services/customer.service';
import { ProductionMachineService } from './production-machine.service';
import { UserNotFoundException } from 'exceptions/user-not-found.exception';
import { CustomerNotFoundException } from 'exceptions/customer-not-found.exception';
import { ProductionMachineNotFoundException } from 'exceptions/production-machine-not-found.exception';
import { Order } from 'common/constants/order';

@Injectable()
export class ProductionTaskService {
    constructor(
        public readonly productionTaskRepository: ProductionTaskRepository,
        public readonly productionMachineService: ProductionMachineService,
        public readonly userService: UserService,
        public readonly customerService: CustomerService,
    ) {}

    async getTask(
        user: FindConditions<UserEntity>,
    ): Promise<ProductionTaskDto | undefined> {
        const { id } = user;
        const queryBuilder = this.productionTaskRepository.createQueryBuilder(
            'productionTask',
        );
        const productionTask = await queryBuilder
            .leftJoinAndSelect('productionTask.user', 'user')
            .leftJoinAndSelect('productionTask.master', 'master')
            .leftJoinAndSelect('productionTask.customer', 'customer')
            .leftJoinAndSelect(
                'productionTask.productionMachine',
                'productionMachine',
            )
            .where('user.id = :id', { id })
            .andWhere('productionTask.status = :status', { status: false })
            .orderBy('productionTask.createdAt', Order.ASC)
            .getOne();

        return productionTask ? productionTask.toDto() : undefined;
    }

    async getTasks(
        pageOptionsDto: ProductionTasksPageOptionsDto,
    ): Promise<ProductionTasksPageDto> {
        const queryBuilder = this.productionTaskRepository.createQueryBuilder(
            'productionTask',
        );
        const [productionTasks, productionTasksCount] = await queryBuilder
            .leftJoinAndSelect('productionTask.user', 'user')
            .leftJoinAndSelect('productionTask.master', 'master')
            .leftJoinAndSelect('productionTask.customer', 'customer')
            .leftJoinAndSelect(
                'productionTask.productionMachine',
                'productionMachine',
            )
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: productionTasksCount,
        });

        return new ProductionTasksPageDto(
            productionTasks.toDtos(),
            pageMetaDto,
        );
    }

    async createProductionTask(
        productionTaskRegisterDto: ProductionTaskRegisterDto,
        master: UserEntity,
    ) {
        const {
            userUuid,
            productionMachineUuid,
            customerUuid,
        } = productionTaskRegisterDto;

        const [user, customer, productionMachine] = await Promise.all([
            this.userService.findUser({ uuid: userUuid }),
            this.customerService.findCustomer({ uuid: customerUuid }),
            this.productionMachineService.findMachine({
                uuid: productionMachineUuid,
            }),
        ]);

        if (!user) {
            throw new UserNotFoundException();
        }
        if (!customer) {
            throw new CustomerNotFoundException();
        }
        if (!productionMachine) {
            throw new ProductionMachineNotFoundException();
        }

        const createdTask = {
            ...productionTaskRegisterDto,
            master,
            user,
            customer,
            productionMachine,
        };
        const productionTask = this.productionTaskRepository.create(
            createdTask,
        );
        await this.productionTaskRepository.save(productionTask);

        return productionTask;
    }
}
