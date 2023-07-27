import { z } from "zod";
import { BillSchemaResponse } from "./create-bill"

export const FindBillsByAccountSchema = z.object({
	accountId: z.string().transform((value) => Number(value)),
});
  
export namespace FindBillsBy {
	export const AccountRequestSchema = FindBillsByAccountSchema
	export const ResponseSchema = z.array(BillSchemaResponse.omit({transactions: true}))

	export type Request = z.infer<typeof AccountRequestSchema>
	export type Response = z.infer<typeof ResponseSchema>
}