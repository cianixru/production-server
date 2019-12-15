import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEntity1576444484592 implements MigrationInterface {
    name = 'updateEntity1576444484592'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "quantity_done" SET DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "quantity_done" DROP DEFAULT`, undefined);
    }

}
