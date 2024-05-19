import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSwipeEntity1716085854134 implements MigrationInterface {
  name = 'CreateSwipeEntity1716085854134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."swipe_type_enum" AS ENUM('like', 'dislike', 'skip')`,
    );
    await queryRunner.query(
      `CREATE TABLE "swipe" ("id" uuid NOT NULL, "profile_id" uuid NOT NULL, "profile_rec_id" uuid NOT NULL, "type" "public"."swipe_type_enum" NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb1669106ad4579aa39400adb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0169a2055ed0c523260dd89bb8" ON "swipe" USING HASH ("profile_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a61b659450d1ee39b89cd34d9" ON "swipe" USING HASH ("profile_rec_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7b00aabc73c47aaa4708474df0" ON "swipe" USING HASH ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7b00aabc73c47aaa4708474df0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a61b659450d1ee39b89cd34d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0169a2055ed0c523260dd89bb8"`,
    );
    await queryRunner.query(`DROP TABLE "swipe"`);
    await queryRunner.query(`DROP TYPE "public"."swipe_type_enum"`);
  }
}
