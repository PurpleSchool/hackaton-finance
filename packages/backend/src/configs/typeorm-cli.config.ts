import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({
  path: '../../envs/.backend.env',
});
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  database: configService.get('DB_NAME'),
  host: configService.get('DB_HOST'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  port: Number(configService.get('DB_PORT')),
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
