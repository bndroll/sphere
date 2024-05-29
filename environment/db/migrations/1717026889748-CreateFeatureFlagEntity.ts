import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeatureFlagEntity1717026889748 implements MigrationInterface {
    name = 'CreateFeatureFlagEntity1717026889748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feature-flag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "enable" boolean NOT NULL DEFAULT false, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5583f262866460961c4f167d02a" UNIQUE ("title"), CONSTRAINT "PK_8ddfd4d2505ffc8019ad9d0a3c8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "feature-flag"`);
    }

}
