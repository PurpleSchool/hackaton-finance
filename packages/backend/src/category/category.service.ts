import { Injectable } from '@nestjs/common';
import { CategoryTypeEnum } from '../../../../contracts';
import { PrismaService } from '../common/database/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async getByType(categoryType: CategoryTypeEnum) {
    const category = await this.prisma.category.findMany({
      where: { type: categoryType },
    });
    return category.map(this.mapToModel);
  }

  private mapToModel(category: Category) {
    return {
      ...category,
      type: category.type as CategoryTypeEnum,
    };
  }
}
