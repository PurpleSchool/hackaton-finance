import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Account } from '../account/account.entity';
import { Currency } from '../currency/currency.entity';
import { Transaction } from './transaction/transaction.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column()
  account_id: number;

  @Column()
  currency_id: number;

  @Column()
  type: number;

  @Column()
  status: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne((type) => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Account, (account) => account.bills)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne((type) => Currency, (currency) => currency.bills)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @OneToMany((type) => Transaction, (transaction) => transaction.bill)
  transactions: Transaction[];
}
