import { Category } from 'src/core/domain/category/entities/category.entity';

export class CreateTagDto {}

export class CreateTagEntityDto {
  title: string;
  category: Category;
}
