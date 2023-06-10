import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TransactionEntity } from '../bill/transaction/transaction.entity';

@Entity({
  name: 'category',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => TransactionEntity, (transaction) => transaction.category)
  transactions: TransactionEntity[];
}
