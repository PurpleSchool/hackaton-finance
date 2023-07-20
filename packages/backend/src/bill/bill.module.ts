import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { TransactionModule } from './transaction/transaction.module';
import { BillController } from './bill.controller';

@Module({
  imports: [TransactionModule],
  providers: [BillService],
  controllers: [BillController],
  exports: [BillService]
})
export class BillModule {}
