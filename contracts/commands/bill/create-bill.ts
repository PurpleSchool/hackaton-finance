import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BillStatusEnum, BillTypeEnum } from './bill.types';

const CreateBillRequestSchema = z.object({
  account_id: z.number(),
  currency_id: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  transactions: z.array(
    z.object({
      sum: z.number(),
      category_id: z.number(),
    }),
  ),
});

const BillResponseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  account_id: z.number(),
  currency_id: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
  created_at: z.coerce.date(),
});

const GetBillsByResponseSchema = z.array(
  z.object({
    id: z.number(),
    account_id: z.number(),
    currency_id: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    status: z.nativeEnum(BillStatusEnum),
    date: z.coerce.date(),
    created_at: z.coerce.date(),
  }),
);

export class CreateBillDto extends createZodDto(CreateBillRequestSchema) {}

export class BillResponseDto extends createZodDto(BillResponseSchema) {}

export class GetBillsByResponseDto extends createZodDto(GetBillsByResponseSchema) {}

