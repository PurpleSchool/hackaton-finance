import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IntegrationsOptions } from '../integration.types';
import { INTEGRATION_MODULE_OPTIONS } from '../integration.constants';
import { ExchangeDto } from '../../currency/dto/currency.dto';

@Injectable()
export class MarketService {
  URL = 'https://api.apilayer.com/fixer';

  constructor(
    @Inject(INTEGRATION_MODULE_OPTIONS)
    private readonly options: IntegrationsOptions,
    private readonly httpService: HttpService,
  ) {}

  public async getExchangeRateByDate({ toCurrency, fromCurrencies, date }: ExchangeDto.Request) {
    const symbols = fromCurrencies.join(',');
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeDto.Response | ExchangeDto.BadResponse>(
          `${URL}/${date}?base=${toCurrency}&symbols=${symbols}`,
          {
            headers: { apiKey: this.options.apiKey },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            if (error.status) {
              throw new HttpException(error.message, error.status);
            }
            throw new ServiceUnavailableException(error.message)
          }),
        ),
    );
    return data;
  }

  public async getExchangeRateLatest({ toCurrency, fromCurrencies }: ExchangeDto.Request) {
    const symbols = fromCurrencies.join(',');
    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeDto.Response | ExchangeDto.BadResponse>(
          `${URL}/latest?base=${toCurrency}&symbols=${symbols}`,
          {
            headers: { apiKey: this.options.apiKey },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            if (error.status) {
              throw new HttpException(error.message, error.status);
            }
            throw new ServiceUnavailableException(error.message)
          }),
        ),
    );
    return data;
  }
}
