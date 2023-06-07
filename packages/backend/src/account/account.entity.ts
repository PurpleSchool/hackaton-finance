import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Bill } from '../bill/bill.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  owner_id: number;

  @OneToMany((type) => Bill, (bill) => bill.account)
  bills: Bill[];

  @ManyToOne((type) => User, (user) => user.accounts)
  @JoinColumn({ name: 'owner_id' })
  user: User;
}
