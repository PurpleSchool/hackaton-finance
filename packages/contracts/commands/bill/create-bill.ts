import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { BillStatusEnum, BillTypeEnum } from "./bill.types";

const CreateBillRequestSchema = z.object({
  accountId: z.number(),
  currencyId: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  transactions: z.array(
    z.object({
      sum: z.number(),
      categoryId: z.number(),
    })
  ),
});

const BillResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  accountId: z.number(),
  currencyId: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
});

const GetBillsByResponseSchema = z.array(
  z.object({
    id: z.number(),
    accountId: z.number(),
    currencyId: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    status: z.nativeEnum(BillStatusEnum),
    date: z.coerce.date(),
    createdAt: z.coerce.date(),
  })
);

export class CreateBillDto extends createZodDto(CreateBillRequestSchema) {}

export class BillResponseDto extends createZodDto(BillResponseSchema) {}

export class GetBillsByResponseDto extends createZodDto(
  GetBillsByResponseSchema
) {}
