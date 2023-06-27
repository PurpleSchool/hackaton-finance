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
import {
  BillTypeEnum,
  BillStatusEnum,
} from '../contracts/commands/bill/bill.types';

@Entity({
  name: 'bill',
})
export class BillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  account_id: number;

  @Column()
  currency_id: number;

  @Column({
    type: 'enum',
    enum: BillTypeEnum,
  })
  type: BillTypeEnum;

  @Column({
    type: 'enum',
    enum: BillStatusEnum,
  })
  status: BillStatusEnum;

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
