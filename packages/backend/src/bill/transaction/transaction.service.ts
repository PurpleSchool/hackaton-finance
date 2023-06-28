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
    arr: { sum?: number; category_id?: number }[],
    billId: number,
  ) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].category_id && arr[i].sum) {
        const transaction = this.transactionRepository.create({
          value: arr[i].sum,
          bill_id: billId,
          category_id: arr[i].category_id,
        });
        this.transactionRepository.save(transaction);
      } else {
        return false;
      }
    }
    return true;
  }
}
