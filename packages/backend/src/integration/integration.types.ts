import { ModuleMetadata } from '@nestjs/common';

export interface IntegrationsOptions {
  apiKey: string;
}

export interface IntegrationModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<IntegrationsOptions> | IntegrationsOptions;
  inject?: any[];
}
