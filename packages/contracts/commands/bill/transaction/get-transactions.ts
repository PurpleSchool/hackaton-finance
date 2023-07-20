import { z } from 'zod';
import { TransactionSchema } from './create-transaction';
import { FindBillSchema } from '../find-bill';

export namespace FindTransactionsBy {
	export const RequestBillSchema = FindBillSchema
	export const ResponseSchema = z.array(TransactionSchema)

	export type RequestBill = z.infer<typeof RequestBillSchema>
	export type Response = z.infer<typeof ResponseSchema>
}