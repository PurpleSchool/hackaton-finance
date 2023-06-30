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
import {
  BillResponseDto,
  CreateBillDto,
  GetBillsByResponseDto,
} from '../../../../contracts/commands/bill/create-bill';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { IUserInfo } from '../user/user.interface';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService, private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateBillDto, @User() user: IUserInfo): Promise<BillResponseDto> {
    const bill = await this.billService.createBill(dto, user.userId);
    const transaction = await this.transactionService.createTransactions(dto.transactions, bill.id);
    if (!transaction.length) {
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
  async findByUser(@User() user: IUserInfo): Promise<GetBillsByResponseDto> {
    return this.billService.findBillsByUserId(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-account/:accountId')
  async findByAccount(@Param('accountId') accountId: number): Promise<GetBillsByResponseDto> {
    return this.billService.findBillsByAccountId(accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: number): Promise<BillResponseDto> {
    return this.billService.findBill(id);
  }
}
