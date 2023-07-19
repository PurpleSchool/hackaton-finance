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
import { TransactionService } from './transaction/transaction.service';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { UserInfo } from '../user/user.interface';
import { CreateBillDto, FindBillDto, FindBillsByDto } from './dto/bill.dto';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService, private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateBillDto.Request, @User() user: UserInfo): Promise<CreateBillDto.Response> {
    const bill = await this.billService.createBill(dto, user.userId);
    const transaction = await this.transactionService.createTransactions(dto.transactions, bill.id);
    if (!transaction.length) {
      throw new BadRequestException();
    }
    return bill;
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
}
