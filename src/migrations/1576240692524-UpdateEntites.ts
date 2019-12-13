import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntites1576240692524 implements MigrationInterface {
    name = 'UpdateEntites1576240692524'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_96c583a6a9cac8cb6e2f8e3bc95"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_2fdccdf1e25cd0216de651e0db3"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_530045f0dad1469197a1e79862e"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_818907b6e76a5a27a65c95aa5e8"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" RENAME COLUMN "operator_id" TO "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP CONSTRAINT "REL_8d4681a2d24fe0a272f0f6cce7"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP CONSTRAINT "REL_44e3806141ebfce0a6137cabfe"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "machine_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "operator_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "task_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_auth_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_908f15885e83b92b12e47b8a783" UNIQUE ("user_auth_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_salary_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ac2e34e4a62f2132f4a7f691913" UNIQUE ("user_salary_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "production_task_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "production_machine_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "user_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_908f15885e83b92b12e47b8a783" FOREIGN KEY ("user_auth_id") REFERENCES "users_auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ac2e34e4a62f2132f4a7f691913" FOREIGN KEY ("user_salary_id") REFERENCES "users_salary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_7dab5bda2b4d812c8d9bbdfba86" FOREIGN KEY ("production_task_id") REFERENCES "production_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_09ceb6b680ac139b0aa2d47a60d" FOREIGN KEY ("production_machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_6a961778180808bac827aee0e19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_6a961778180808bac827aee0e19"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_09ceb6b680ac139b0aa2d47a60d"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP CONSTRAINT "FK_7dab5bda2b4d812c8d9bbdfba86"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ac2e34e4a62f2132f4a7f691913"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_908f15885e83b92b12e47b8a783"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "user_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "production_machine_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" DROP COLUMN "production_task_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ac2e34e4a62f2132f4a7f691913"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_salary_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_908f15885e83b92b12e47b8a783"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_auth_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "task_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "operator_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD "machine_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD "user_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "REL_44e3806141ebfce0a6137cabfe" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD "user_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "REL_8d4681a2d24fe0a272f0f6cce7" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" RENAME COLUMN "user_id" TO "operator_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_818907b6e76a5a27a65c95aa5e8" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_530045f0dad1469197a1e79862e" FOREIGN KEY ("task_id") REFERENCES "production_tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_2fdccdf1e25cd0216de651e0db3" FOREIGN KEY ("machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "production_machines_history" ADD CONSTRAINT "FK_96c583a6a9cac8cb6e2f8e3bc95" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_salary" ADD CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
