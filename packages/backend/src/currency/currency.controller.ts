import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import {
  ExchangeRateBadResponseDto,
  ExchangeRateDto,
  ExchangeRateResponseDto,
  GetAllCurrencyResponseDto,
} from '../../../contracts';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('exchange-rate')
  public async getExchangeRate(
    @Body() dto: ExchangeRateDto,
  ): Promise<ExchangeRateResponseDto | ExchangeRateBadResponseDto> {
    return this.currencyService.getExchangeRate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll(): Promise<GetAllCurrencyResponseDto> {
    return this.currencyService.getAll();
  }
}
