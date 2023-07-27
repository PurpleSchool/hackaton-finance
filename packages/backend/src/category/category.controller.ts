import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { GetCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('by-type')
  public async getByType(
    @Query() { type }: GetCategoryDto.Request,
  ): Promise<GetCategoryDto.Response> {
    return this.categoryService.getByType(type);
  }
}
