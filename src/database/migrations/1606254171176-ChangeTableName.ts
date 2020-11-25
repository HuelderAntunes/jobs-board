import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTableName1606254171176 implements MigrationInterface {
    name = 'ChangeTableName1606254171176'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subscriber" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying, "phone" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_073600148a22d05dcf81d119a6a" UNIQUE ("email"), CONSTRAINT "UQ_eb1262b66b1050b6927ff63cfac" UNIQUE ("phone"), CONSTRAINT "PK_1c52b7ddbaf79cd2650045b79c7" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(`DROP TABLE "subscriber"`)
    }
}
