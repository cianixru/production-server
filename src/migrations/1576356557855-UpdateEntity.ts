import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntity1576356557855 implements MigrationInterface {
    name = 'UpdateEntity1576356557855'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_75cb3e40674d779287ef7542bf1"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "customer_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "master_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "production_machine_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c" FOREIGN KEY ("master_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_75cb3e40674d779287ef7542bf1" FOREIGN KEY ("production_machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_75cb3e40674d779287ef7542bf1"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "production_machine_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "master_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ALTER COLUMN "customer_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_75cb3e40674d779287ef7542bf1" FOREIGN KEY ("production_machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c" FOREIGN KEY ("master_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
