import { z } from 'zod';
import { TransactionSchema } from './create-transaction';

const FindTransactionsSchema = z.object({
  id: z.string().transform((value) => Number(value)),
});

export namespace FindTransaction {
  export const RequestSchema = FindTransactionsSchema
  export const ResponseSchema = TransactionSchema

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}
