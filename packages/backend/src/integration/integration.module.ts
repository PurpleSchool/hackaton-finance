import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MarketService } from './market/market.service';
import { INTEGRATION_MODULE_OPTIONS } from './integration.constants';
import { IntegrationModuleAsyncOptions } from './integration.types';

@Global()
@Module({})
export class IntegrationModule {
  static registerAsync(options: IntegrationModuleAsyncOptions): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options);
    return {
      module: IntegrationModule,
      imports: options.imports,
      exports: [MarketService],
      providers: [MarketService, asyncOptions],
    };
  }

  private static createAsyncOptionsProvider(
    options: IntegrationModuleAsyncOptions,
  ): Provider {
    return {
      provide: INTEGRATION_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || [],
    };
  }
}
