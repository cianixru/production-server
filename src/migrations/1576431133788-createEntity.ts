import {MigrationInterface, QueryRunner} from "typeorm";

export class createEntity1576431133788 implements MigrationInterface {
    name = 'createEntity1576431133788'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "status" SET DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "status" DROP DEFAULT`, undefined);
    }

}
