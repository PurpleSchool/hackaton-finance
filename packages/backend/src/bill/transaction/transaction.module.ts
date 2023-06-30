import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
