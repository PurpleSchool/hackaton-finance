import { CurrencyModule } from './currency/currency.module';
import { TransactionModule } from './transaction/transaction.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CurrencyModule, TransactionModule],
})
export class AppModule {}
