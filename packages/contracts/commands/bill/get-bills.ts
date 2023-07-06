import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { BillSchema } from "./create-bill"

export const FindBillsByAccountSchema = z.object({
	accountId: z.string().transform((value) => Number(value)),
});
  
export namespace FindBillsBy {
	export class AccountRequest extends createZodDto(FindBillsByAccountSchema) {}
	export class Response extends createZodDto(z.array(BillSchema.omit({transactions: true}))) {}
}