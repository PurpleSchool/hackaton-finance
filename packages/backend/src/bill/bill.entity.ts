import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AccountEntity } from '../account/account.entity';
import { CurrencyEntity } from '../currency/currency.entity';
import { TransactionEntity } from './transaction/transaction.entity';

@Entity({
  name: 'bill',
})
export class BillEntity {
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

  @ManyToOne((type) => UserEntity, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne((type) => AccountEntity, (account) => account.bills)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @ManyToOne((type) => CurrencyEntity, (currency) => currency.bills)
  @JoinColumn({ name: 'currency_id' })
  currency: CurrencyEntity;

  @OneToMany((type) => TransactionEntity, (transaction) => transaction.bill)
  transactions: TransactionEntity[];
}
