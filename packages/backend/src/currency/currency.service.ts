import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketService } from '../integration/market/market.service';
import { ExchangeRateDto } from '../../../../contracts/';
import { PrismaService } from '../database/prisma.service';

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
