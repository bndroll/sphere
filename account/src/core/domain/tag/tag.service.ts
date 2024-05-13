import { Injectable } from '@nestjs/common';
import { TagRepository } from 'src/core/domain/tag/repositories/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findByCategoryId(id: string) {
    return await this.tagRepository.findByCategoryId(id);
  }
}
