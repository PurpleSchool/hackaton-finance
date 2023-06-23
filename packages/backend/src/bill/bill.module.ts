import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './bill.entity';
import { BillController } from './bill.controller';

@Module({
  imports: [TransactionModule, TypeOrmModule.forFeature([BillEntity])],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
