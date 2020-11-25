import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDefaultCreatedAt1605887940702 implements MigrationInterface {
    name = 'AddDefaultCreatedAt1605887940702'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(
            `ALTER TABLE "job" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "job" ALTER COLUMN "createdAt" DROP DEFAULT`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
    }
}
