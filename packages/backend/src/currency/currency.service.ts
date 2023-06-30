import { Injectable } from '@nestjs/common';
import { MarketService } from '../integration/market/market.service';
import { ExchangeRateDto } from '../../../../contracts/';
import { PrismaService } from '../common/database/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly marketService: MarketService,
    private readonly prisma: PrismaService,
  ) {}

  public async getAll() {
    return this.prisma.currency.findMany();
  }

  public async getExchangeRate(dto: ExchangeRateDto) {
    return dto.date
      ? this.marketService.getExchangeRateByDate(dto)
      : this.marketService.getExchangeRateLatest(dto);
  }
}
