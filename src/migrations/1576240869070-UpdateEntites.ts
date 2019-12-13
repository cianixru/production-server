import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntites1576240869070 implements MigrationInterface {
    name = 'UpdateEntites1576240869070'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_908f15885e83b92b12e47b8a783"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ac2e34e4a62f2132f4a7f691913"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_908f15885e83b92b12e47b8a783"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_auth_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ac2e34e4a62f2132f4a7f691913"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_salary_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD "user_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "UQ_8d4681a2d24fe0a272f0f6cce7f" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD "user_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "UQ_44e3806141ebfce0a6137cabfe2" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "UQ_44e3806141ebfce0a6137cabfe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "UQ_8d4681a2d24fe0a272f0f6cce7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_salary_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ac2e34e4a62f2132f4a7f691913" UNIQUE ("user_salary_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_auth_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_908f15885e83b92b12e47b8a783" UNIQUE ("user_auth_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ac2e34e4a62f2132f4a7f691913" FOREIGN KEY ("user_salary_id") REFERENCES "users_salary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_908f15885e83b92b12e47b8a783" FOREIGN KEY ("user_auth_id") REFERENCES "users_auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
