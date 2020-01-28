import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ProductionDocumentationEntity } from '../models/production-documentation.entity';

@EntityRepository(ProductionDocumentationEntity)
export class ProductionDocumentationRepository extends Repository<
    ProductionDocumentationEntity
> {}
