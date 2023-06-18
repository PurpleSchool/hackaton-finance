import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryTypeEnum } from './category.types';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('by-type')
  public async getByType(@Query('type') categoryType: CategoryTypeEnum) {
    return this.categoryService.getByType(categoryType);
  }
}
