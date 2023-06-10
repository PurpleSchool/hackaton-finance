import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [TransactionService],
})
export class TransactionModule {}
