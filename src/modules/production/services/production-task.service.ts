import { Injectable } from '@nestjs/common';

import { FindConditions, UpdateResult } from 'typeorm';
import { PageMetaDto } from '../../../common/dto/page-meta.dto';
import { ProductionTaskRepository } from '../repositories/production-task.repository';
import { ProductionTasksPageOptionsDto } from '../dto/production-tasks-page-options.dto';
import { ProductionTasksPageDto } from '../dto/production-tasks-page.dto';
import { UserEntity } from '../../user/models/user.entity';
import { ProductionTaskRegisterDto } from '../dto/production-task-register.dto';
import { UserService } from '../../user/services/user.service';
import { CustomerService } from '../../customer/services/customer.service';
import { ProductionMachineService } from './production-machine.service';
import { Order } from '../../../common/constants/order';
import { ProductionTaskEntity } from '../models/production-task.entity';
import { IFile } from '../../../shared/interfaces/file.interface';
import { ValidatorService } from '../../../shared/services/validator.service';
import { AwsS3Service } from '../../../shared/services/aws-s3.service';
import {
    UserNotFoundException,
    FileNotImageException,
    CustomerNotFoundException,
    ProductionMachineNotFoundException,
    ProductionTaskNotFoundException,
} from '../../../exceptions';

@Injectable()
export class ProductionTaskService {
    constructor(
        public readonly productionTaskRepository: ProductionTaskRepository,
        public readonly productionMachineService: ProductionMachineService,
        public readonly userService: UserService,
        public readonly customerService: CustomerService,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    async getTask(
        user: FindConditions<UserEntity>,
    ): Promise<ProductionTaskEntity | undefined> {
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

        return productionTask || undefined;
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
        file: IFile,
    ): Promise<ProductionTaskEntity> {
        const {
            userUuid,
            productionMachineUuid,
            customerUuid,
        } = productionTaskRegisterDto;

        if (file && !this.validatorService.isImage(file.mimetype)) {
            throw new FileNotImageException();
        }

        const [
            user,
            customer,
            productionMachine,
            technicalDrawing,
        ] = await Promise.all([
            this.userService.findUser({ uuid: userUuid }),
            this.customerService.findCustomer({ uuid: customerUuid }),
            this.productionMachineService.findMachine({
                uuid: productionMachineUuid,
            }),
            this.awsS3Service.uploadImage(file),
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
            technicalDrawing,
        };
        const productionTask = this.productionTaskRepository.create(
            createdTask,
        );
        await this.productionTaskRepository.save(productionTask);

        return productionTask;
    }

    async updateQuantity(user: UserEntity): Promise<UpdateResult> {
        const productionTask = await this.getTask(user);
        if (!productionTask) {
            throw new ProductionTaskNotFoundException();
        }

        const { id, quantityMade, quantityPlanned } = productionTask;
        const queryBuilder = await this.productionTaskRepository
            .createQueryBuilder('productionTask')
            .update(ProductionTaskEntity)
            .where('id = :id', { id })
            .set({ quantityMade: quantityMade + 1 });

        if (quantityMade === quantityPlanned - 1) {
            queryBuilder.set({ status: true, quantityMade: quantityMade + 1 });
        }

        return queryBuilder.execute();
    }
}
