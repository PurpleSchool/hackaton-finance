import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [TransactionService],
})
export class TransactionModule {}
