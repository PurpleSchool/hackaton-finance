import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BillTypeEnum } from '../bill.types';

const GetTransactionsRequestSchema = z.object({
  account_id: z.number(),
  limit: z.number().max(20),
  offset: z.number().max(20),
});

const GetTransactionsResponseSchema = z.array(
  z.object({
    transaction_id: z.number(),
    account_id: z.number(),
    currency_id: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    date: z.coerce.date(),
    sum: z.number().nullable(),
    category_id: z.number(),
  }),
);

export class GetTransactionsResponse extends createZodDto(
  GetTransactionsResponseSchema,
) {}
export class GetTransactionsRequest extends createZodDto(
  GetTransactionsRequestSchema,
) {}
