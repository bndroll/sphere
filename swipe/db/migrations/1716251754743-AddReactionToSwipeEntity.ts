import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReactionToSwipeEntity1716251754743
  implements MigrationInterface
{
  name = 'AddReactionToSwipeEntity1716251754743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "swipe" ADD "reaction" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b004e7de9949b16581a105e366" ON "swipe" USING HASH ("reaction") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0055b974e222056e76cbe0595e" ON "swipe" ("created_date") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0055b974e222056e76cbe0595e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b004e7de9949b16581a105e366"`,
    );
    await queryRunner.query(`ALTER TABLE "swipe" DROP COLUMN "reaction"`);
  }
}
