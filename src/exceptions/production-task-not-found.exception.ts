'use strict';

import { NotFoundException } from '@nestjs/common';

export class ProductionTaskNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.production_task_not_found', error);
    }
}
