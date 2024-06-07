import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdColumnToProfile1717720871827
  implements MigrationInterface
{
  name = 'AddUserIdColumnToProfile1717720871827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "user_id" uuid NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "user_id"`);
  }
}
