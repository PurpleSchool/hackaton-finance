import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { ExchangeDto, GetCurrencyDto } from './dto/currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('exchange-rate')
  public async getExchangeRate(
    @Body() dto: ExchangeDto.Request,
  ): Promise<ExchangeDto.Response | ExchangeDto.BadResponse> {
    return this.currencyService.getExchangeRate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(): Promise<GetCurrencyDto.Response> {
    return this.currencyService.getAll();
  }
}
