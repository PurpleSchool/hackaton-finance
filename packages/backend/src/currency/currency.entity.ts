import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BillEntity } from '../bill/bill.entity';

@Entity({
  name: 'currency',
})
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany((type) => BillEntity, (bill) => bill.currency)
  bills: BillEntity[];
}
