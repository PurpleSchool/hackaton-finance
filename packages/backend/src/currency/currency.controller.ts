import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ExchangeRateDto } from './dto/exchange-rate.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  public async getAll() {
    return this.currencyService.getAll();
  }

  @Post('exchange-rate')
  public async getExchangeRate(@Body() dto: ExchangeRateDto) {
    return this.currencyService.getExchangeRate(dto);
  }
}
