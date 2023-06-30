import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillEntity } from './bill.entity';
import { NotFoundException } from '@nestjs/common';
import { BILL_NOT_FOUND_ERROR } from './bill.constants';
import { CreateBillDto } from '../../../../contracts/';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillEntity)
    private billRepository: Repository<BillEntity>,
  ) {}

  async findBill(id: number) {
    const bill = await this.billRepository.findOneBy({ id });
    if (!bill) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return bill;
  }

  async findBillsByUserId(userId: number) {
    const billsByUser = await this.billRepository.find({
      where: {
        user_id: userId,
      },
    });
    if (!billsByUser.length) {
      throw new NotFoundException();
    }

    return billsByUser;
  }

  async findBillsByAccountId(accountId: number) {
    const billsByAccount = await this.billRepository.find({
      where: {
        account_id: accountId,
      },
    });
    if (!billsByAccount.length) {
      throw new NotFoundException();
    }

    return billsByAccount;
  }

  async createBill(dto: CreateBillDto, userId: number) {
    const bill = this.billRepository.create({
      user_id: userId,
      account_id: dto.account_id,
      currency_id: dto.currency_id,
      type: dto.type,
      status: dto.status,
      date: dto.date,
    });
    return this.billRepository.save(bill);
  }

  async deleteBill(id: number) {
    const deletedBill = await this.billRepository.delete(id);
    if (!deletedBill.affected) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return deletedBill;
  }

  async updateBill(
    id: number,
    userId: number,
    dto: Omit<CreateBillDto, 'transactions'>,
  ) {
    const updatedBill = await this.billRepository.update(id, {
      user_id: userId,
      account_id: dto.account_id,
      currency_id: dto.currency_id,
      date: dto.date,
      status: dto.status,
      type: dto.type,
    });
    if (!updatedBill.affected) {
      throw new NotFoundException(BILL_NOT_FOUND_ERROR);
    }

    return updatedBill;
  }
}
