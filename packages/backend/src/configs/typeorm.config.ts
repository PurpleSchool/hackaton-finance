import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    database: configService.get('DB_NAME'),
    host: configService.get('DB_HOST'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    port: Number(configService.get('DB_PORT')),
    connectTimeoutMS: Number(configService.get('DB_CONNECTION_TIMEOUT')),
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
    keepConnectionAlive: true,
  };
};
