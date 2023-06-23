import { ConfigService } from '@nestjs/config';
import { IntegrationsOptions } from '../integration/integration.types';

export const getIntegrationConfig = (
  configService: ConfigService,
): IntegrationsOptions => {
  const apiKey = configService.get('APILAYER_FREE_KEY');
  if (!apiKey) {
    throw new Error('APILAYER_FREE_KEY не задан');
  }
  return { apiKey };
};
