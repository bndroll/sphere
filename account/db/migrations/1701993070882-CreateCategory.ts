import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1701993070882 implements MigrationInterface {
    name = 'CreateCategory1701993070882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL, "title" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT '"2023-12-07T23:51:32.308Z"', "created_date" TIMESTAMP NOT NULL DEFAULT '"2023-12-07T23:51:32.308Z"', CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
    }
}
