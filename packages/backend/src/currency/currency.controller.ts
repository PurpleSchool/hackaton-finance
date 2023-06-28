import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { ExchangeRateDto } from 'src/contracts/commands/currency/get-exchange-rate';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('exchange-rate')
  public async getExchangeRate(@Body() dto: ExchangeRateDto) {
    return this.currencyService.getExchangeRate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll() {
    return this.currencyService.getAll();
  }
}
