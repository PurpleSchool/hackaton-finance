import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';
import { IUserInfo } from 'src/user/user.interface';
import { CreateBillDto } from 'src/contracts/commands/bill/create-bill';
import { TransactionService } from './transaction/transaction.service';

@Controller('bill')
export class BillController {
  constructor(
    private billService: BillService,
    private transactionService: TransactionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateBillDto, @User() user: IUserInfo) {
    const bill = await this.billService.createBill(dto, user.userId);
    const transaction = await this.transactionService.createTransactions(
      dto.transactions,
      bill.id,
    );
    if (!transaction) {
      throw new BadRequestException();
    }

    return bill;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.billService.deleteBill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Omit<CreateBillDto, 'transactions'>,
    @User() user: IUserInfo,
  ) {
    return this.billService.updateBill(id, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user')
  async findByUser(@User() user: IUserInfo) {
    return this.billService.findBillsByUserId(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-account/:accountId')
  async findByAccount(@Param('accountId') accountId: number) {
    return this.billService.findBillsByAccountId(accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    return this.billService.findBill(id);
  }
}
