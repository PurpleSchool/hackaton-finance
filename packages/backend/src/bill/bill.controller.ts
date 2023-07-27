import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { TransactionService } from './transaction/transaction.service';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { UserInfo } from '../user/user.interface';
import { CreateBillDto, CreateTransactionDto, FindBillDto, FindBillsByDto, FindTransactionDto, FindTransactionsByDto } from './dto/bill.dto';
import { FindTransactionsBy } from '../../../contracts';
import { TRANSACTION_NOT_FOUND_BY_BILL_ERROR, TRANSACTION_NOT_FOUND_ERROR } from './transaction/transaction.constants';
@Controller('bill')
export class BillController {
  constructor(private billService: BillService, private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateBillDto.Request, @User() user: UserInfo): Promise<CreateBillDto.Response> {
    const bill = await this.billService.createBill(dto, user.userId);
    const transaction = await this.transactionService.createManyTransactions(dto.transactions, bill.id);
    if (!transaction.length) {
      throw new BadRequestException();
    }
    return {...bill, transactions:[...transaction]};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() { id }: FindBillDto.Request): Promise<FindBillDto.Response> {
    return this.billService.deleteBill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() { id }: FindBillDto.Request,
    @Body() dto: Omit<CreateBillDto.Request, 'transactions'>,
    @User() user: UserInfo,
  ): Promise<FindBillDto.Response> {
    return this.billService.updateBill(id, user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user')
  async findByUser(@User() user: UserInfo): Promise<FindBillsByDto.Response> {
    return this.billService.findBillsByUserId(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-account/:accountId')
  async findByAccount(@Param() { accountId }: FindBillsByDto.AccountRequest): Promise<FindBillsByDto.Response> {
    return this.billService.findBillsByAccountId(accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param() { id }: FindBillDto.Request): Promise<FindBillDto.Response> {
    return this.billService.findBill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transaction/create')
  async createTransaction(@Body() dto: CreateTransactionDto.Request): Promise<CreateTransactionDto.Response> {
    return this.transactionService.createTransaction(dto.billId, dto.value, dto.categoryId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/transaction/by-bill')
  async findTransactionsByBill (@Param() { id }: FindTransactionsByDto.RequestBill): Promise<FindTransactionsBy.Response> {
    const transactions = await this.transactionService.findTransactionsByBillId(id)
    if (!transactions.length) {
      throw new NotFoundException(TRANSACTION_NOT_FOUND_BY_BILL_ERROR)
    }
    return transactions
  }

  @UseGuards(JwtAuthGuard)
  @Get('transaction/:id')
  async findTransaction(@Param() { id }: FindTransactionDto.Request): Promise<FindTransactionDto.Response> {
    const transaction = await this.transactionService.findTransaction(id)
    if (!transaction) {
      throw new NotFoundException(TRANSACTION_NOT_FOUND_ERROR)
    }
    return transaction
  }

  @UseGuards(JwtAuthGuard)
  @Delete('transaction/:id')
  async deleteTransaction (@Param() { id }: FindTransactionDto.Request) {
    return this.transactionService.deleteTransaction(id)
  }
}
