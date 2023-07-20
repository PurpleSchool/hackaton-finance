import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyTransactions(transactions: { value: number; categoryId: number }[], billId: number) {
    await this.prisma.transaction.createMany({
      data: transactions.map(({ categoryId, value }) => {
        return { value, categoryId, billId };
      }),
    });
    return this.prisma.transaction.findMany({ where: { billId } });
  }

  async createTransaction (billId: number, value: number, categoryId: number) {
    return this.prisma.transaction.create({
      data: { billId, value, categoryId }
    })
  }

  async findTransaction (id: number) {
    return this.prisma.transaction.findUnique({where: { id }})
  }

  async findTransactionsByBillId (billId: number) {
    return this.prisma.transaction.findMany({where: { billId }})
  }

  async deleteTransaction (id: number) {
    return this.prisma.transaction.delete({where: { id }})
  }

  async countTransactionValueByBill (billId: number) {
      const transactions = await this.prisma.transaction.findMany({where: { billId }});
      let balance = 0;
      for (const transaction of transactions) {
        balance += transaction.value
      }
  
      return balance
  }
} 
