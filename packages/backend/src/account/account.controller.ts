import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account, FindAccount, FindAccountsBy } from '@contracts';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { UserInfo } from '../user/user.interface';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: Account.Request,
    @User() user: UserInfo,
  ): Promise<Account.Response> {
    return this.accountService.createAccount(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-owner')
  async findByOwner(@User() user: UserInfo): Promise<FindAccountsBy.Response> {
    return this.accountService.findAccountsByOwner(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param() { id }: FindAccount.Request): Promise<FindAccount.Response> {
    return this.accountService.findAccount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() { id }: FindAccount.Request): Promise<Account.Response> {
    return this.accountService.deleteAccount(id);
  }
}
