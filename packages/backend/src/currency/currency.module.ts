import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
