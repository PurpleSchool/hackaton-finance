import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { BillEntity } from '../bill.entity';
import { CategoryEntity } from '../../category/category.entity';

@Entity({
  name: 'transaction',
})
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  bill_id: number;

  @Column()
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne((type) => BillEntity, (bill) => bill.transactions)
  @JoinColumn({ name: 'bill_id' })
  bill: BillEntity;

  @ManyToOne((type) => CategoryEntity, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
