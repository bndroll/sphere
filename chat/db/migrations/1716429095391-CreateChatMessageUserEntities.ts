import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatMessageUserEntities1716429095391
  implements MigrationInterface
{
  name = 'CreateChatMessageUserEntities1716429095391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL, "profile_id" uuid NOT NULL, "info" jsonb NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."chat_type_enum" AS ENUM('Single', 'Group')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" uuid NOT NULL, "name" character varying, "type" "public"."chat_type_enum" NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL, "text" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "chatId" uuid, "profileId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_chats_chat" ("profileId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_b72ba99c7b11df1aca0b8c31544" PRIMARY KEY ("profileId", "chatId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a2842f8f84c3402b2093bf726" ON "profile_chats_chat" ("profileId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2fafa1cdab22c258d91f95f16" ON "profile_chats_chat" ("chatId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_fc960b472ada5ed94a8dae0b511" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_chats_chat" ADD CONSTRAINT "FK_5a2842f8f84c3402b2093bf7261" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_chats_chat" ADD CONSTRAINT "FK_f2fafa1cdab22c258d91f95f16d" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_chats_chat" DROP CONSTRAINT "FK_f2fafa1cdab22c258d91f95f16d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_chats_chat" DROP CONSTRAINT "FK_5a2842f8f84c3402b2093bf7261"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_fc960b472ada5ed94a8dae0b511"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2fafa1cdab22c258d91f95f16"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a2842f8f84c3402b2093bf726"`,
    );
    await queryRunner.query(`DROP TABLE "profile_chats_chat"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "chat"`);
    await queryRunner.query(`DROP TYPE "public"."chat_type_enum"`);
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
