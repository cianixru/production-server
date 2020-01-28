import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/models/abstract.entity';
import { ProductionDocumentationDto } from '../dto/production-documentation.dto';
import { ProductionTaskEntity } from './production-task.entity';

@Entity({ name: 'production_documentations' })
export class ProductionDocumentationEntity extends AbstractEntity<
    ProductionDocumentationDto
> {
    @Column({ nullable: false })
    public name: string;

    @OneToMany(
        () => ProductionTaskEntity,
        (productionTask: ProductionTaskEntity) =>
            productionTask.productionDocumentation,
    )
    public productionTask: ProductionTaskEntity[];

    dtoClass = ProductionDocumentationDto;
}
