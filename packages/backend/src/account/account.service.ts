import { Injectable, NotFoundException } from '@nestjs/common';
import { ACCOUNT_NOT_FOUND_ERROR } from './account.constants';
import { PrismaService } from '../common/database/prisma.service';
import { Account } from '../../../contracts';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(dto: Account.Request, userId: number) {
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
    const deletedAccount = await this.prisma.account.delete({ where: { id: +id } });
    if (!deletedAccount) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }

    return deletedAccount;
  }
}
