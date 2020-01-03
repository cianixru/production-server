import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductionTaskEntity1578066532112 implements MigrationInterface {
    name = 'updateProductionTaskEntity1578066532112'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" RENAME COLUMN "technical_drawing" TO "production_documentation_id"`, undefined);
        await queryRunner.query(`CREATE TABLE "production_documentations" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5901a6dd61df687dba5d5577001" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "production_documentation_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "production_documentation_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_8904c73ef0e4c1df8447c854ad2" FOREIGN KEY ("production_documentation_id") REFERENCES "production_documentations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_8904c73ef0e4c1df8447c854ad2"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP COLUMN "production_documentation_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD "production_documentation_id" character varying NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "production_documentations"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" RENAME COLUMN "production_documentation_id" TO "technical_drawing"`, undefined);
    }

}
