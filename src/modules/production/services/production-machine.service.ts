import { Injectable } from '@nestjs/common';
import { ProductionMachineRepository } from '../repositories/production-machine.repository';
import { PageMetaDto } from 'common/dto/page-meta.dto';
import { ProductionMachinesPageOptionsDto } from '../dto/production-machines-page-options.dto';
import { ProductionMachinesPageDto } from '../dto/production-machines-page.dto';
import { ProductionMachineDto } from '../dto/production-machine.dto';
import { ProductionMachineEntity } from '../models/production-machine.entity';
import { ProductionMachineRegisterDto } from '../dto/production-machine-register.dto';
import { FindConditions } from 'typeorm';

@Injectable()
export class ProductionMachineService {
    constructor(
        public readonly productionMachineRepository: ProductionMachineRepository,
    ) {}

    /**
     * Find single customer
     */
    findMachine(
        findData: FindConditions<ProductionMachineEntity>,
    ): Promise<ProductionMachineEntity> {
        return this.productionMachineRepository.findOne(findData);
    }

    createMachine(
        productionMachineRegisterDto: ProductionMachineRegisterDto,
    ): Promise<ProductionMachineEntity> {
        const productionMachine = this.productionMachineRepository.create(
            productionMachineRegisterDto,
        );

        return this.productionMachineRepository.save(productionMachine);
    }

    async getMachines(
        pageOptionsDto: ProductionMachinesPageOptionsDto,
    ): Promise<ProductionMachinesPageDto> {
        const queryBuilder = this.productionMachineRepository.createQueryBuilder(
            'productionMachine',
        );
        const [productionMachines, productionMachinesCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: productionMachinesCount,
        });
        return new ProductionMachinesPageDto(
            productionMachines.toDtos(),
            pageMetaDto,
        );
    }
}
