'use strict';

import { AbstractEntity } from '../models/abstract.entity';

export class AbstractDto {
    uuid: string;

    constructor(abstract: AbstractEntity) {
        this.uuid = abstract.uuid;
    }
}
