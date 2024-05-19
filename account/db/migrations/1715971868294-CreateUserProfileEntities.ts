import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserProfileEntities1715971868294
  implements MigrationInterface
{
  name = 'CreateUserProfileEntities1715971868294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('Male', 'Female')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "telegram_id" bigint, "username" character varying, "password" character varying, "phone" character varying, "birthday_date" TIMESTAMP, "gender" "public"."user_gender_enum", "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c1ed111fba8a34b812d11f42352" UNIQUE ("telegram_id"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c1ed111fba8a34b812d11f4235" ON "user" ("telegram_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_type_enum" AS ENUM('User', 'Event')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_visible_enum" AS ENUM('Open', 'Close')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL, "type" "public"."profile_type_enum" NOT NULL, "info" jsonb NOT NULL, "visible" "public"."profile_visible_enum" NOT NULL DEFAULT 'Open', "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL, "title" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f16dbbf263b0af0f03637fa7b5" UNIQUE ("title"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL, "title" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_ea660f2baf9c3f3141d7c2ef531" UNIQUE ("title"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_tags_tag" ("profileId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_5ab647d78021161d036ed4f6ffd" PRIMARY KEY ("profileId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b5050a391030a088bb72a07b4" ON "profile_tags_tag" ("profileId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8418e948dc8206003c1331c18f" ON "profile_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_3881afc104de5307431139a7129" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_tags_tag" ADD CONSTRAINT "FK_9b5050a391030a088bb72a07b45" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_tags_tag" ADD CONSTRAINT "FK_8418e948dc8206003c1331c18f7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_tags_tag" DROP CONSTRAINT "FK_8418e948dc8206003c1331c18f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_tags_tag" DROP CONSTRAINT "FK_9b5050a391030a088bb72a07b45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_3881afc104de5307431139a7129"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8418e948dc8206003c1331c18f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b5050a391030a088bb72a07b4"`,
    );
    await queryRunner.query(`DROP TABLE "profile_tags_tag"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TYPE "public"."profile_visible_enum"`);
    await queryRunner.query(`DROP TYPE "public"."profile_type_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c1ed111fba8a34b812d11f4235"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
  }
}
