'use strict';

import { NotFoundException } from '@nestjs/common';

export class ProductionMachineNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.production_machine_not_found', error);
    }
}
