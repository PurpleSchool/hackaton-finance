import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BillEntity } from '../bill/bill.entity';

@Entity({
  name: 'account',
})
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  owner_id: number;

  @OneToMany((type) => BillEntity, (bill) => bill.account)
  bills: BillEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.accounts)
  @JoinColumn({ name: 'owner_id' })
  user: UserEntity;
}
