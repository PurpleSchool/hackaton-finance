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
} from '../../../../contracts';

@Injectable()
export class MarketService {
  URL = 'https://api.apilayer.com/fixer';

  constructor(
    @Inject(INTEGRATION_MODULE_OPTIONS)
    private readonly options: IntegrationsOptions,
    private readonly httpService: HttpService,
  ) {}

  public async getExchangeRateByDate({ toCurrency, fromCurrencies, date }: ExchangeRateDto) {
    const symbols = fromCurrencies.join(',');
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRateResponseDto | ExchangeRateBadResponseDto>(
          `${URL}/${date}?base=${toCurrency}&symbols=${symbols}`,
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

  public async getExchangeRateLatest({ toCurrency, fromCurrencies }: ExchangeRateDto) {
    const symbols = fromCurrencies.join(',');
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRateResponseDto | ExchangeRateBadResponseDto>(
          `${URL}/latest?base=${toCurrency}&symbols=${symbols}`,
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
