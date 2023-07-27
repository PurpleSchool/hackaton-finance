import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { BILL_NOT_FOUND_ERROR } from './bill.constants';
import { PrismaService } from '../common/database/prisma.service';
import { Bill } from '@prisma/client';
import { CreateBillDto } from './dto/bill.dto';
import { BillStatusEnum, BillTypeEnum } from '../../../contracts';
import { TransactionService } from './transaction/transaction.service';

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService, private readonly transactionService: TransactionService) {}

  async findBill(id: number) {
    const bill = await this.prisma.bill.findUnique({ where: { id } });
    if (!bill) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return this.mapToModel(bill);
  }

  async findBillsByUserId(userId: number) {
    const bill = await this.prisma.bill.findMany({ where: { userId } });

    return bill.map(this.mapToModel);
  }

  async findBillsByAccountId(accountId: number) {
    const bill = await this.prisma.bill.findMany({
      where: { accountId },
    });

    return bill.map(this.mapToModel);
  }

  async createBill(dto: CreateBillDto.Request, userId: number) {
    const bill = await this.prisma.bill.create({
      data: {
        userId,
        accountId: dto.accountId,
        currencyId: dto.currencyId,
        type: dto.type,
        status: dto.status,
        date: dto.date,
      },
    });
    return this.mapToModel(bill);
  }

  async deleteBill(id: number) {
    const deletedBill = await this.prisma.bill.delete({ where: { id } });
    if (!deletedBill) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return this.mapToModel(deletedBill);
  }

  async updateBill(id: number, userId: number, dto: Omit<CreateBillDto.Request, 'transactions'>) {
    const bill = await this.findBill(id);
    const updatedBill = await this.prisma.bill.update({
      where: { id: bill.id },
      data: {
        userId,
        accountId: dto.accountId,
        currencyId: dto.currencyId,
        date: dto.date,
        status: dto.status,
        type: dto.type,
      },
    });
    if (!updatedBill) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return this.mapToModel(updatedBill);
  }

  async countBillBalanceByAccount(accountId: number) {
    const bills = await this.prisma.bill.findMany({where: { accountId }})
    const balance = {
      expense: 0,
      income: 0
    }

    for (const bill of bills) {
      if (bill.status != BillStatusEnum.COMPLETED) {
        continue
      }
      const billBalance = await this.transactionService.countTransactionValueByBill(bill.id);
      if (bill.type === BillTypeEnum.INCOME) {
        balance.income += billBalance
        continue
      }
      balance.expense += billBalance
    }

    return balance
  }

  private mapToModel(bill: Bill) {
    return {
      ...bill,
      type: bill.type as BillTypeEnum,
      status: bill.status as BillStatusEnum,
    };
  }
}
