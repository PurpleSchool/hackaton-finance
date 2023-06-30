import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransactions(
    transactions: { sum?: number; categoryId?: number }[],
    billId: number,
  ) {
    await this.prisma.transaction.createMany({
      data: transactions.map(({ categoryId, sum: value }) => {
        return { value, categoryId, billId };
      }),
    });
    return this.prisma.transaction.findMany({ where: { billId } });
  }
}
