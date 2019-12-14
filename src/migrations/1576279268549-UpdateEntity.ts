import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntity1576279268549 implements MigrationInterface {
    name = 'UpdateEntity1576279268549';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD "production_machine_id" integer',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" ADD CONSTRAINT "FK_75cb3e40674d779287ef7542bf1" FOREIGN KEY ("production_machine_id") REFERENCES "production_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP CONSTRAINT "FK_75cb3e40674d779287ef7542bf1"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "production_tasks" DROP COLUMN "production_machine_id"',
            undefined,
        );
    }
}
