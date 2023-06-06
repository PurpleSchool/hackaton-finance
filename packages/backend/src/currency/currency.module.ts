import { CurrencyService } from './currency.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CurrencyService],
})
export class CurrencyModule {}
