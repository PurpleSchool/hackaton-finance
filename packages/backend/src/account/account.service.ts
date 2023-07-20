import { Injectable, NotFoundException } from '@nestjs/common';
import { ACCOUNT_NOT_FOUND_ERROR } from './account.constants';
import { PrismaService } from '../common/database/prisma.service';
import { AccountDto } from './dto/account.dto';
import { BillService } from '../bill/bill.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService, private readonly billService: BillService) {}

  async createAccount(dto: AccountDto.Request, userId: number) {
    const account = this.prisma.account.create({
      data: {
        name: dto.name,
        currencyId: dto.currencyId,
        ownerId: userId,
      },
    });
    return account;
  }

  async findAccount(id: number) {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }

    return account;
  }

  async findAccountsByOwner(userId: number) {
    const accountsByOwner = await this.prisma.account.findMany({
      where: {
        ownerId: userId,
      },
    });
    if (!accountsByOwner.length) {
      throw new NotFoundException();
    }

    return accountsByOwner;
  }

  async deleteAccount(id: number) {
    const deletedAccount = await this.prisma.account.delete({ where: { id } });
    if (!deletedAccount) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }

    return deletedAccount;
  }

  async countBalance(accountId: number) {
    const billBalance = await this.billService.countBillBalanceByAccount(accountId)
    return {balance: billBalance.income - billBalance.expense}
  }
}
