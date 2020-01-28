'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { ContractType } from '../../../common/constants/contract-type';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { UserSalaryEntity } from '../models/user-salary.entity';

export class UserSalaryDto extends AbstractDto {
    @ApiProperty()
    salary: number;

    @ApiProperty({ enum: ContractType })
    contractType: ContractType;

    @ApiProperty({ format: 'date' })
    updatedAt: string;

    constructor(userSalary: UserSalaryEntity) {
        super(userSalary);
        this.salary = userSalary.salary;
        this.contractType = userSalary.contractType;
        this.updatedAt = userSalary.updatedAt;
    }
}
