'use strict';

import { IAbstract } from '../interfaces/abstract.interface';

export class AbstractDto {
    uuid: string;

    constructor(abstract: IAbstract) {
        this.uuid = abstract.uuid;
    }
}
