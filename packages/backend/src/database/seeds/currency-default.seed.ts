import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { CurrencyEntity } from '../../currency/currency.entity';

export default class CurrencyDefaultSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CurrencyEntity)
      .values([
        { name: 'Доллар США', code: 'USD' },
        { name: 'Российский рубль', code: 'RUB' },
        { name: 'Евро', code: 'EUR' },
      ])
      .execute();
  }
}
