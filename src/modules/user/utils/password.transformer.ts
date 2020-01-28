import { ValueTransformer } from 'typeorm';

import { UtilsService } from '../../../providers/services/utils.service';

export class PasswordTransformer implements ValueTransformer {
    to(value) {
        if (value) {
            return UtilsService.generateHash(value);
        }
        return value;
    }
    from(value) {
        return value;
    }
}
