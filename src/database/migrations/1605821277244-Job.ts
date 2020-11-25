import { MigrationInterface, QueryRunner } from 'typeorm'

export class Job1605821277244 implements MigrationInterface {
    name = 'Job1605821277244'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "job" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "company" character varying NOT NULL, "companyWebsite" character varying NOT NULL, "companyEmail" character varying NOT NULL, "contactEmail" character varying NOT NULL, "description" text NOT NULL, "applicationUrl" character varying NOT NULL, "paymentStatus" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job"`)
    }
}
