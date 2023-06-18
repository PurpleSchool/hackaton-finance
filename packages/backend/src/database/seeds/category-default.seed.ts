import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CategoryEntity } from '../../category/category.entity';
import { CategoryTypeEnum } from '../../category/category.types';

export default class CategoryDefaultSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values([
        { name: 'salary', type: CategoryTypeEnum.INCOME },
        { name: 'investment', type: CategoryTypeEnum.INCOME },
        { name: 'debt', type: CategoryTypeEnum.INCOME },
        { name: 'gifts', type: CategoryTypeEnum.INCOME },
        { name: 'housing', type: CategoryTypeEnum.EXPENSE },
        { name: 'food', type: CategoryTypeEnum.EXPENSE },
        { name: 'clothing', type: CategoryTypeEnum.EXPENSE },
        { name: 'transport', type: CategoryTypeEnum.EXPENSE },
        { name: 'education', type: CategoryTypeEnum.EXPENSE },
        { name: 'gifts', type: CategoryTypeEnum.EXPENSE },
        { name: 'vacation', type: CategoryTypeEnum.EXPENSE },
        { name: 'entertainment', type: CategoryTypeEnum.EXPENSE },
        { name: 'beauty', type: CategoryTypeEnum.EXPENSE },
        { name: 'tax', type: CategoryTypeEnum.EXPENSE },
        { name: 'debt', type: CategoryTypeEnum.EXPENSE },
        { name: 'credit', type: CategoryTypeEnum.EXPENSE },
        { name: 'equipment', type: CategoryTypeEnum.EXPENSE },
      ])
      .execute();
  }
}
