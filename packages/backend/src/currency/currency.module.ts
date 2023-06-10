import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService],
})
export class CurrencyModule {}
