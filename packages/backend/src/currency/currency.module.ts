import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [CurrencyService],
})
export class CurrencyModule {}
