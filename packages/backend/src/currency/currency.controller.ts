import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll() {
    return this.currencyService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('exchange-rate')
  public async getExchangeRate(@Body() dto: ExchangeRateDto) {
    return this.currencyService.getExchangeRate(dto);
  }
}
