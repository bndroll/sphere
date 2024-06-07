import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToProfileEntity1717724159358 implements MigrationInterface {
    name = 'AddIndexToProfileEntity1717724159358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b0465dda30314a8786db3354a6" ON "profile" ("profile_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d752442f45f258a8bdefeebb2f" ON "profile" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d752442f45f258a8bdefeebb2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0465dda30314a8786db3354a6"`);
    }

}
