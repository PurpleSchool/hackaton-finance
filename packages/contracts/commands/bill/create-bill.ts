import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { BillStatusEnum, BillTypeEnum } from "./bill.types";


export const BillSchema = z.object({
  id: z.number(),
  userId: z.number(),
  accountId: z.number(),
  currencyId: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  transactions: z.array(
    z.object({
      sum: z.number(),
      categoryId: z.number(),
    })
  ),
});

export namespace CreateBill {
  export class Request extends createZodDto(BillSchema.omit({id: true, userId: true, createdAt: true,})) {}
  export class Response extends createZodDto(BillSchema) {}
}

