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
import {
  AccountResponseDto,
  CreateAccountDto,
} from '../../../../contracts/commands/account/create-account';
import { User } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { IUserInfo } from '../user/user.interface';
import { GetAccountsByResponseDto } from '../../../../contracts';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: CreateAccountDto,
    @User() user: IUserInfo,
  ): Promise<AccountResponseDto> {
    return this.accountService.createAccount(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-owner')
  async findByOwner(
    @User() user: IUserInfo,
  ): Promise<GetAccountsByResponseDto> {
    return this.accountService.findAccountsByOwner(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: number): Promise<AccountResponseDto> {
    return this.accountService.findAccount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.accountService.deleteAccount(id);
  }
}
