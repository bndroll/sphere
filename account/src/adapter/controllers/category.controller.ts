import { Controller, Get } from '@nestjs/common';
import { CategoryService } from 'src/core/domain/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllWithTags() {
    return await this.categoryService.findAllWithTags();
  }
}
