import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntity1576444318763 implements MigrationInterface {
    name = 'updateEntity1576444318763'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "quantity"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "quantity_planned" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "quantity_done" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "quantity_done"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "quantity_planned"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "quantity" integer NOT NULL`, undefined);
    }

}
