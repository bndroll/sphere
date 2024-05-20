import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryErrorMessages } from './category.constants';
import { Category } from './entities/category.entity';
import { TagService } from 'src/core/domain/tag/tag.service';
import { CategoryStorage } from 'src/core/domain/category/storages/category.storage';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly tagService: TagService,
    private readonly categoryStorage: CategoryStorage,
  ) {}

  async create(dto: CreateCategoryDto) {
    const oldCategory = await this.categoryRepository.findByTitle(dto.title);
    if (oldCategory) {
      throw new BadRequestException(CategoryErrorMessages.AlreadyExists);
    }

    const category = Category.create({
      title: dto.title,
    });

    const savedCategory = await this.categoryRepository.save(category);
    await this.categoryStorage.invalidate();
    return savedCategory;
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findAllWithTags() {
    const cachedCategories = await this.categoryStorage.get();
    if (!cachedCategories || cachedCategories.length === 0) {
      const categories = await this.categoryRepository.findAllWithTags();
      await this.categoryStorage.insert(categories);
      return categories;
    }

    return cachedCategories;
  }

  async findById(id: string) {
    const category = await this.categoryRepository.findByIdBR(id);
    if (!category) {
      throw new NotFoundException(CategoryErrorMessages.NotFound);
    }
    return category;
  }

  async findTagsByCategoryId(id: string) {
    const category = await this.categoryRepository.findByIdBR(id);
    if (!category) {
      throw new NotFoundException(CategoryErrorMessages.NotFound);
    }

    return await this.tagService.findByCategoryId(id);
  }
}
