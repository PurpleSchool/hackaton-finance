import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BillEntity } from '../bill/bill.entity';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];

  @OneToMany((type) => BillEntity, (bill) => bill.user)
  bills: BillEntity[];
}
