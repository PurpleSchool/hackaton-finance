import { CurrencyService } from './currency.service';
import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
