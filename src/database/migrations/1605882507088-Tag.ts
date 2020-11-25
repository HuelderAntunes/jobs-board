import { MigrationInterface, QueryRunner } from 'typeorm'

export class Tag1605882507088 implements MigrationInterface {
    name = 'Tag1605882507088'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "jobId" integer, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "job" DROP COLUMN "expirationDate"`
        )
        await queryRunner.query(
            `ALTER TABLE "job" ADD "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL`
        )
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "createdAt"`)
        await queryRunner.query(
            `ALTER TABLE "job" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "tag" ADD CONSTRAINT "FK_7f8766757228adcd99d95e7685f" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tag" DROP CONSTRAINT "FK_7f8766757228adcd99d95e7685f"`
        )
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "createdAt"`)
        await queryRunner.query(
            `ALTER TABLE "job" ADD "createdAt" TIMESTAMP NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "job" DROP COLUMN "expirationDate"`
        )
        await queryRunner.query(
            `ALTER TABLE "job" ADD "expirationDate" TIMESTAMP NOT NULL`
        )
        await queryRunner.query(`DROP TABLE "tag"`)
    }
}
