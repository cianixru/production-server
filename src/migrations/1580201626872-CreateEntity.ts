import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntity1580201626872 implements MigrationInterface {
    name = 'CreateEntity1580201626872';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'CREATE TABLE "users_auth" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "users_auth_role_enum" NOT NULL DEFAULT \'WORKER_ROLE\', "login" SERIAL NOT NULL, "password" character varying, "user_id" integer NOT NULL, CONSTRAINT "UQ_cb56638d87f34c88226a489d698" UNIQUE ("login"), CONSTRAINT "REL_8d4681a2d24fe0a272f0f6cce7" UNIQUE ("user_id"), CONSTRAINT "PK_32ddc1ae708e8261a870a6eb3e6" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "users_salary" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "salary" numeric(13,2) NOT NULL DEFAULT 0, "contract_type" "users_salary_contract_type_enum" NOT NULL DEFAULT \'Full-time\', "updated_at" date NOT NULL DEFAULT now(), "user_id" integer NOT NULL, CONSTRAINT "REL_44e3806141ebfce0a6137cabfe" UNIQUE ("user_id"), CONSTRAINT "PK_8142e2da245f6810a3733d9c2be" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "created_at" date NOT NULL DEFAULT now(), "last_login" TIMESTAMP WITH TIME ZONE, "last_logout" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "production_documentations" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5901a6dd61df687dba5d5577001" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "production_machines" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_254580e89662da2f9dfbaee813a" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "production_tasks" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity_planned" integer NOT NULL, "quantity_made" integer NOT NULL DEFAULT 0, "status" boolean NOT NULL DEFAULT false, "duration" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" integer NOT NULL, "user_id" integer NOT NULL, "master_id" integer NOT NULL, "production_machine_id" integer NOT NULL, "production_documentation_id" integer NOT NULL, CONSTRAINT "PK_2e650b46a4eb798dbb97b61973e" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "customers" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "tax_number" character varying NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users_salary" ADD CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c" FOREIGN KEY ("master_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_75cb3e40674d779287ef7542bf1" FOREIGN KEY ("production_machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_8904c73ef0e4c1df8447c854ad2" FOREIGN KEY ("production_documentation_id") REFERENCES "production_documentations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_8904c73ef0e4c1df8447c854ad2"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_75cb3e40674d779287ef7542bf1"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_82f234ebcf79b8d89dacffa771c"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_e1f3bcdd95bcd3f936a817ea0ab"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_2ee4c500c54cd6c1165b2a1347a"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users_salary" DROP CONSTRAINT "FK_44e3806141ebfce0a6137cabfe2"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"',
            undefined,
        );
        await queryRunner.query('DROP TABLE "customers"', undefined);
        await queryRunner.query('DROP TABLE "production_tasks"', undefined);
        await queryRunner.query('DROP TABLE "production_machines"', undefined);
        await queryRunner.query(
            'DROP TABLE "production_documentations"',
            undefined,
        );
        await queryRunner.query('DROP TABLE "users"', undefined);
        await queryRunner.query('DROP TABLE "users_salary"', undefined);
        await queryRunner.query('DROP TABLE "users_auth"', undefined);
    }
}
