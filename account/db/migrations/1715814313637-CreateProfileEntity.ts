import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileEntity1715814313637 implements MigrationInterface {
    name = 'CreateProfileEntity1715814313637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile_tags_tag" ("profileId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_5ab647d78021161d036ed4f6ffd" PRIMARY KEY ("profileId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b5050a391030a088bb72a07b4" ON "profile_tags_tag" ("profileId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8418e948dc8206003c1331c18f" ON "profile_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "about"`);
        await queryRunner.query(`CREATE TYPE "public"."profile_type_enum" AS ENUM('User', 'Event')`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "type" "public"."profile_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "info" jsonb NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."profile_visible_enum" AS ENUM('Open', 'Close')`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "visible" "public"."profile_visible_enum" NOT NULL DEFAULT 'Open'`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_3881afc104de5307431139a7129" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_tags_tag" ADD CONSTRAINT "FK_9b5050a391030a088bb72a07b45" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "profile_tags_tag" ADD CONSTRAINT "FK_8418e948dc8206003c1331c18f7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_tags_tag" DROP CONSTRAINT "FK_8418e948dc8206003c1331c18f7"`);
        await queryRunner.query(`ALTER TABLE "profile_tags_tag" DROP CONSTRAINT "FK_9b5050a391030a088bb72a07b45"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_3881afc104de5307431139a7129"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "created_date"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updated_date"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "visible"`);
        await queryRunner.query(`DROP TYPE "public"."profile_visible_enum"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "info"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."profile_type_enum"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "about" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8418e948dc8206003c1331c18f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b5050a391030a088bb72a07b4"`);
        await queryRunner.query(`DROP TABLE "profile_tags_tag"`);
    }

}
