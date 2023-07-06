import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { BillSchema } from "./create-bill";

export const FindBillSchema = z.object({
	id: z.string().transform((value) => Number(value)),
});

export namespace FindBill {
	export class Request extends createZodDto(FindBillSchema) {}
	export class Response extends createZodDto(BillSchema.omit({transactions: true})) {}
}