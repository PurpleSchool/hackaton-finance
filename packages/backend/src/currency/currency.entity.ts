import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Bill } from '../bill/bill.entity';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany((type) => Bill, (bill) => bill.currency)
  bills: Bill[];
}
