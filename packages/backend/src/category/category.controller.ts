import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryTypeEnum } from './category.types';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('by-type')
  public async getByType(@Query('type') categoryType: CategoryTypeEnum) {
    return this.categoryService.getByType(categoryType);
  }
}
