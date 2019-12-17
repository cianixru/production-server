import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProductionTask1576582012746 implements MigrationInterface {
    name = 'UpdateProductionTask1576582012746'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "technical_drawing" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "technical_drawing"`, undefined);
    }

}
