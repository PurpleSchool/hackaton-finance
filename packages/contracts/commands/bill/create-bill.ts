import { z } from "zod";
import { BillStatusEnum, BillTypeEnum } from "./bill.types";
import { TransactionSchema } from "./transaction";

export const BillSchemaRequest = z.object({
  accountId: z.number(),
  currencyId: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  transactions: z.array(TransactionSchema.omit({id: true, createdAt: true, billId: true})),
});

export const BillSchemaResponse = z.object({
  id: z.number(),
  userId: z.number(),
  accountId: z.number(),
  currencyId: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  transactions: z.array(TransactionSchema),
});


export namespace CreateBill {
  export const RequestSchema = BillSchemaRequest
  export const ResponseSchema = BillSchemaResponse

  export type Request = z.infer<typeof RequestSchema>  
  export type Response = z.infer<typeof ResponseSchema>
}

