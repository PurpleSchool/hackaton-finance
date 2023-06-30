import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { CategoryResponseDto, CategoryTypeEnum } from '../../../../contracts';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('by-type')
  public async getByType(
    @Query('type') categoryType: CategoryTypeEnum,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.getByType(categoryType);
  }
}
