import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNewField1606240316697 implements MigrationInterface {
    name = 'AddNewField1606240316697'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "susbcriber" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying, "phone" character varying, CONSTRAINT "PK_88c5e91106e9399516817fce3a4" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "job" ADD "slug" character varying NOT NULL`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "slug"`)
        await queryRunner.query(`DROP TABLE "susbcriber"`)
    }
}
