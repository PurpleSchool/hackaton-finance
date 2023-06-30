import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ACCOUNT_NOT_FOUND_ERROR } from './account.constants';
import { CreateAccountDto } from '../../../../contracts';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private billRepository: Repository<AccountEntity>,
  ) {}

  async createAccount(dto: CreateAccountDto, userId: number) {
    const account = this.billRepository.create({
      name: dto.name,
      owner_id: userId,
    });
    return this.billRepository.save(account);
  }

  async findAccount(id: number) {
    const account = await this.billRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }

    return account;
  }

  async findAccountsByOwner(userId: number) {
    const accountsByOwner = await this.billRepository.find({
      where: {
        owner_id: userId,
      },
    });
    if (!accountsByOwner.length) {
      throw new NotFoundException();
    }

    return accountsByOwner;
  }

  async deleteAccount(id: number) {
    const deletedAccount = await this.billRepository.delete(id);
    if (!deletedAccount.affected) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }

    return deletedAccount;
  }
}
