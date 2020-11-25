import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueToEmailColumn1606249168640 implements MigrationInterface {
    name = 'AddUniqueToEmailColumn1606249168640'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."createdAt" IS NULL`
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."createdAt" IS NULL`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`
        )
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`)
    }
}
