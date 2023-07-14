import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BillTypeEnum } from '../bill.types';

const GetTransactionsRequestSchema = z.object({
  accountId: z.number(),
  limit: z.number().max(20),
  offset: z.number().max(20),
});

const GetTransactionsResponseSchema = z.array(
  z.object({
    transactionId: z.number(),
    accountId: z.number(),
    currencyId: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    date: z.coerce.date(),
    sum: z.number().nullable(),
    categoryId: z.number(),
  }),
);

export namespace GetTransaction {
  export class Request extends createZodDto(GetTransactionsRequestSchema,) {}
  export class Response extends createZodDto(GetTransactionsResponseSchema,) {}
}
