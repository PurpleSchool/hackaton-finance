import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IntegrationsOptions } from '../integration.types';
import { INTEGRATION_MODULE_OPTIONS } from '../integration.constants';
import {
  ExchangeRateBadResponseDto,
  ExchangeRateDto,
  ExchangeRateResponseDto,
} from 'src/contracts/commands/currency/get-exchange-rate';

@Injectable()
export class MarketService {
  constructor(
    @Inject(INTEGRATION_MODULE_OPTIONS)
    private readonly options: IntegrationsOptions,
    private readonly httpService: HttpService,
  ) {}

  public async getExchangeRateByDate({ base, symbols, date }: ExchangeRateDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRateResponseDto | ExchangeRateBadResponseDto>(
          // eslint-disable-next-line prettier/prettier
          `https://api.apilayer.com/fixer/${date}?base=${base}&symbols=${symbols.join(',')}`,
          {
            headers: { apiKey: this.options.apiKey },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.message, error.status);
          }),
        ),
    );
    return data;
  }

  public async getExchangeRateLatest({ base, symbols }: ExchangeRateDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRateResponseDto | ExchangeRateBadResponseDto>(
          // eslint-disable-next-line prettier/prettier
          `https://api.apilayer.com/fixer/latest?base=${base}&symbols=${symbols.join(',')}`,
          {
            headers: { apiKey: this.options.apiKey },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.message, error.status);
          }),
        ),
    );
    return data;
  }
}
