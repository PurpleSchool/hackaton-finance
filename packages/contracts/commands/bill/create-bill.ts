import { z } from "zod";
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
  export const RequestSchema = BillSchema.omit({id: true, userId: true, createdAt: true,})
  export const ResponseSchema = BillSchema

  export type Request = z.infer<typeof RequestSchema>  
  export type Response = z.infer<typeof ResponseSchema>
}

