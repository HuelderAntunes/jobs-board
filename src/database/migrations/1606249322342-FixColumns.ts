import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixColumns1606249322342 implements MigrationInterface {
    name = 'FixColumns1606249322342'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."email" IS NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "susbcriber" ADD CONSTRAINT "UQ_ca698d88d6045ad9a46ebcf0d73" UNIQUE ("email")`
        )
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."phone" IS NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "susbcriber" ADD CONSTRAINT "UQ_19e6eeb1f30d5368f96fd1ed3f4" UNIQUE ("phone")`
        )
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."createdAt" IS NULL`
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."createdAt" IS NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "susbcriber" DROP CONSTRAINT "UQ_19e6eeb1f30d5368f96fd1ed3f4"`
        )
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."phone" IS NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "susbcriber" DROP CONSTRAINT "UQ_ca698d88d6045ad9a46ebcf0d73"`
        )
        await queryRunner.query(
            `COMMENT ON COLUMN "susbcriber"."email" IS NULL`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`
        )
        await queryRunner.query(`COMMENT ON COLUMN "tag"."name" IS NULL`)
    }
}
