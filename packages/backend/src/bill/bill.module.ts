import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './bill.entity';

@Module({
  imports: [TransactionModule, TypeOrmModule.forFeature([BillEntity])],
  providers: [BillService],
})
export class BillModule {}
