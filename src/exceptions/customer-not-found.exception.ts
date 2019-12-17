'use strict';

import { NotFoundException } from '@nestjs/common';

export class CustomerNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.customer_not_found', error);
    }
}
