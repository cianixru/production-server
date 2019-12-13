import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntites1576241192088 implements MigrationInterface {
    name = 'UpdateEntites1576241192088'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
