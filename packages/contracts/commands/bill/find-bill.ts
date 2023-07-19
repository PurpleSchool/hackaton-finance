import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { BillSchema } from "./create-bill";

export const FindBillSchema = z.object({
	id: z.string().transform((value) => Number(value)),
});

export namespace FindBill {
	export const RequestSchema = FindBillSchema;
	export const ResponseSchema = BillSchema.omit({transactions: true})

	export type Request = z.infer<typeof RequestSchema>
	export type Response = z.infer<typeof ResponseSchema>
}