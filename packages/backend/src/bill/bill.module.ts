import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';

@Module({
  imports: [TransactionModule, TypeOrmModule.forFeature([Bill])],
  providers: [BillService],
})
export class BillModule {}
