import { z } from "zod";


export const TransactionSchema = z.object({
	id: z.number(),
	value: z.number(),
	categoryId: z.number(),
	createdAt: z.coerce.date(),
	billId: z.number()
})


export namespace CreateTransaction {
	export const RequestSchema = TransactionSchema.omit({id: true, createdAt: true})
	export const ResponseSchema = TransactionSchema 

	export type Request = z.infer<typeof RequestSchema>
	export type Response = z.infer<typeof ResponseSchema>
}