import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../account/account.entity';
import { Bill } from '../bill/bill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany((type) => Bill, (bill) => bill.user)
  bills: Bill[];
}
