import { z } from 'zod';
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
  export const RequestSchema = GetTransactionsRequestSchema
  export const ResponseSchema = GetTransactionsResponseSchema

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}
