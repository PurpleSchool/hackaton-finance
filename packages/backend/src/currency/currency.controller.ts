import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { Exchange, GetCurrency } from '@contracts';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('exchange-rate')
  public async getExchangeRate(
    @Body() dto: Exchange.Request,
  ): Promise<Exchange.Response | Exchange.BadResponse> {
    return this.currencyService.getExchangeRate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(): Promise<GetCurrency.Response> {
    return this.currencyService.getAll();
  }
}
