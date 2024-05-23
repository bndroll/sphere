import { Injectable } from '@nestjs/common';
import { TagRepository } from 'src/core/domain/tag/repositories/tag.repository';
import { In } from 'typeorm';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findByCategoryId(id: string) {
    return await this.tagRepository.findByCategoryId(id);
  }

  async findByIds(ids: string[]) {
    if (ids.length === 0) {
      return [];
    }
    return await this.tagRepository.find({ where: { id: In(ids) } });
  }
}
