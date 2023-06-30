import { Injectable } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransactions(
    transactions: { sum?: number; category_id?: number }[],
    billId: number,
  ) {
    for (const { sum, category_id } of transactions) {
      if (!sum && !category_id) {
        return false;
      }
      const transactionObj = this.transactionRepository.create({
        value: sum,
        bill_id: billId,
        category_id: category_id,
      });
      await this.transactionRepository.save(transactionObj);
    }
    return true;
  }
}
