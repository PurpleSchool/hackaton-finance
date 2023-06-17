import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({
  path: '../../envs/.backend.env',
});
const configService = new ConfigService();
export default {
  type: 'postgres',
  database: configService.get('DB_NAME'),
  host: configService.get('DB_HOST'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  port: Number(configService.get('DB_PORT')),
  logging: true,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};
