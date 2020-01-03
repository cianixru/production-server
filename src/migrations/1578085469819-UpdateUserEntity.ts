import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserEntity1578085469819 implements MigrationInterface {
    name = 'UpdateUserEntity1578085469819'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "zip" TO "zip_code"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "zip"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "tax"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "zip_code" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "tax_number" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "tax_number"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "zip_code"`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "tax" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "customers" ADD "zip" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "zip_code" TO "zip"`, undefined);
    }

}
