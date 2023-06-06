import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
