import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BillDto } from './dto/bill.dto';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post('create')
  async create(@Body() dto: BillDto) {
    return this.billService.createBill(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.billService.deleteBill(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: BillDto) {
    return this.billService.updateBill(id, dto);
  }

  @Get('byUser/:userId')
  async findByUser(@Param('userId') userId: number) {
    return this.billService.findBillsByUserId(userId);
  }

  @Get('byAccount/:accountId')
  async findByAccount(@Param('accountId') accountId: number) {
    return this.billService.findBillsByAccountId(accountId);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.billService.findBill(id);
  }
}
