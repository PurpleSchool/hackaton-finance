import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillDto } from './dto/bill.dto';
import { BillService } from './bill.service';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';
import { IUserInfo } from 'src/user/user.interface';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: BillDto, @User() user: IUserInfo) {
    return this.billService.createBill(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.billService.deleteBill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: BillDto) {
    return this.billService.updateBill(id, dto);
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
