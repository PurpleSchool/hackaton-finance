import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Bill } from '../bill.entity';
import { Category } from '../../category/category.entity';

@Entity()
export class Transaction {
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

  @ManyToOne((type) => Bill, (bill) => bill.transactions)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;

  @ManyToOne((type) => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
