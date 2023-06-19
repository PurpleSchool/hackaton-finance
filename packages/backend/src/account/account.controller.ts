import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('create')
  async create(@Body() dto: AccountDto) {
    return this.accountService.createAccount(dto);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.accountService.findAccount(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.accountService.deleteAccount(id);
  }

  @Get('byOwner/:ownerId')
  async findByOwner(@Param('ownerId') ownerId: number) {
    return this.accountService.findAccountsByOwner(ownerId);
  }
}
