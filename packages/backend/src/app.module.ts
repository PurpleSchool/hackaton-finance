import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyModule } from './currency/currency.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './configs/typeorm.config';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { IntegrationModule } from './integration/integration.module';
import { getIntegrationConfig } from './configs/integration.config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../envs/.backend.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    CurrencyModule,
    BillModule,
    UserModule,
    AccountModule,
    CategoryModule,
    IntegrationModule.registerAsync({
      imports: [HttpModule],
      inject: [ConfigService],
      useFactory: getIntegrationConfig,
    }),
  ],
})
export class AppModule {}
