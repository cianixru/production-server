import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProductionTask1576585540386 implements MigrationInterface {
    name = 'UpdateProductionTask1576585540386'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "technical_drawing" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "technical_drawing" DROP NOT NULL`, undefined);
    }

}
