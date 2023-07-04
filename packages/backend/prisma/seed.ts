import { PrismaClient, Prisma } from '@prisma/client';
import { CategoryTypeEnum } from '../../contracts';

const prisma = new PrismaClient();

const categories: Prisma.CategoryCreateManyInput[] = [
  { name: 'salary', type: CategoryTypeEnum.INCOME, id: 1 },
  { name: 'investment', type: CategoryTypeEnum.INCOME, id: 2 },
  { name: 'debt', type: CategoryTypeEnum.INCOME, id: 3 },
  { name: 'gifts', type: CategoryTypeEnum.INCOME, id: 4 },
  { name: 'housing', type: CategoryTypeEnum.EXPENSE, id: 5 },
  { name: 'food', type: CategoryTypeEnum.EXPENSE, id: 6 },
  { name: 'clothing', type: CategoryTypeEnum.EXPENSE, id: 7 },
  { name: 'transport', type: CategoryTypeEnum.EXPENSE, id: 8 },
  { name: 'education', type: CategoryTypeEnum.EXPENSE, id: 9 },
  { name: 'gifts', type: CategoryTypeEnum.EXPENSE, id: 10 },
  { name: 'vacation', type: CategoryTypeEnum.EXPENSE, id: 11 },
  { name: 'entertainment', type: CategoryTypeEnum.EXPENSE, id: 12 },
  { name: 'beauty', type: CategoryTypeEnum.EXPENSE, id: 13 },
  { name: 'tax', type: CategoryTypeEnum.EXPENSE, id: 14 },
  { name: 'debt', type: CategoryTypeEnum.EXPENSE, id: 15 },
  { name: 'credit', type: CategoryTypeEnum.EXPENSE, id: 16 },
  { name: 'equipment', type: CategoryTypeEnum.EXPENSE, id: 17 },
];

const currencies: Prisma.CurrencyCreateManyInput[] = [
  { name: 'Доллар США', code: 'USD', id: 1 },
  { name: 'Российский рубль', code: 'RUB', id: 2 },
  { name: 'Евро', code: 'EUR', id: 3 },
];

async function main() {
  await prisma.$connect();
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      create: category,
      update: category,
    });
  }

  console.log('Добавлено ' + categories.length + ' категорий');

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { id: currency.id },
      create: currency,
      update: currency,
    });
  }

  console.log('Добавлено ' + currencies.length + ' валют');

  await prisma.$disconnect();
}

main();
