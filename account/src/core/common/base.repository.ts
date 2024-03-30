import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

export class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  constructor(
    entity: EntityTarget<Entity>,
    entityManager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(entity, entityManager, queryRunner);
  }

  async insertBR(entity: Entity) {
    return await this.createQueryBuilder().insert().values(entity).execute();
  }

  async findByIdBR(id: number | string) {
    return await this.createQueryBuilder('e')
      .where('e.id = :id', { id })
      .getOne()
      .catch(() => null);
  }

  async softDeleteByIdBR(id: number | string) {
    return await this.createQueryBuilder('e')
      .softDelete()
      .where('e.id = :id', { id })
      .execute()
      .catch(() => null);
  }
}
