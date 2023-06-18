import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { TransactionEntity } from '../bill/transaction/transaction.entity';
import { CategoryTypeEnum } from './category.types';

@Entity({
  name: 'category',
})
@Unique(['name', 'type'])
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryTypeEnum,
  })
  type: CategoryTypeEnum;

  @OneToMany((type) => TransactionEntity, (transaction) => transaction.category)
  transactions: TransactionEntity[];
}
