import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryErrorMessages } from './category.constants';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto) {
    const oldCategory = await this.categoryRepository.findByTitle(dto.title);
    if (oldCategory) {
      throw new BadRequestException(CategoryErrorMessages.AlreadyExists);
    }

    const category = Category.create({
      title: dto.title,
    });

    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findById(id: string) {
    const category = await this.categoryRepository.findByIdBR(id);
    if (!category) {
      throw new NotFoundException(CategoryErrorMessages.NotFound);
    }
    return category;
  }
}
