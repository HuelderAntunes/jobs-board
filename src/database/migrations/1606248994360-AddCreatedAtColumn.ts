import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCreatedAtColumn1606248994360 implements MigrationInterface {
    name = 'AddCreatedAtColumn1606248994360'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "susbcriber" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "susbcriber" DROP COLUMN "createdAt"`
        )
    }
}
