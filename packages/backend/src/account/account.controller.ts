import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { UserInfo } from '../user/user.interface';
import { AccountDto, FindAccountDto, FindAccountsByDto } from './dto/account.dto';
import { BillService } from '../bill/bill.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService, private readonly billService: BillService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: AccountDto.Request,
    @User() user: UserInfo,
  ): Promise<AccountDto.Response> {
    return this.accountService.createAccount(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-owner')
  async findByOwner(@User() user: UserInfo): Promise<FindAccountsByDto.Response> {
    return this.accountService.findAccountsByOwner(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param() { id }: FindAccountDto.Request): Promise<FindAccountDto.Response> {
    return this.accountService.findAccount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() { id }: FindAccountDto.Request): Promise<AccountDto.Response> {
    return this.accountService.deleteAccount(id);
  }

  @Get(':id/balance')
  async countBalance (@Param() { id }: FindAccountDto.Request): Promise<FindAccountDto.ResponseBalance> {
    const billBalance = await this.billService.countBillBalanceByAccount(id)
    return {balance: billBalance.income - billBalance.expense}
  }
}
