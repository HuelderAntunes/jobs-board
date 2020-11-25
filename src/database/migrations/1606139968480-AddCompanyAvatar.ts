import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCompanyAvatar1606139968480 implements MigrationInterface {
    name = 'AddCompanyAvatar1606139968480'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "job" ADD "companyAvatar" character varying NOT NULL`
        )
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "job"."createdAt" IS NULL`)
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "companyAvatar"`)
    }
}
