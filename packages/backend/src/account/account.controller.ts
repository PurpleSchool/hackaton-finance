import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { IUserInfo } from 'src/user/user.interface';
import { User } from 'src/decorators/user.decorator';
import { CreateAccountDto } from 'src/contracts/commands/account/create-account';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateAccountDto, @User() user: IUserInfo) {
    return this.accountService.createAccount(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-owner')
  async findByOwner(@User() user: IUserInfo) {
    return this.accountService.findAccountsByOwner(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    return this.accountService.findAccount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.accountService.deleteAccount(id);
  }
}
