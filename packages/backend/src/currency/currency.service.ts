import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './currency.entity';
import { MarketService } from '../integration/market/market.service';
import { ExchangeRateDto } from 'src/contracts/commands/currency/get-exchange-rate';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
    private readonly marketService: MarketService,
  ) {}

  public async getAll() {
    return this.currencyRepository.find();
  }

  public async getExchangeRate(dto: ExchangeRateDto) {
    return dto.date
      ? this.marketService.getExchangeRateByDate(dto)
      : this.marketService.getExchangeRateLatest(dto);
  }
}
