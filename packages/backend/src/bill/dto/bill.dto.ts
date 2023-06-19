import { z } from 'zod';
import { BillStatusEnum, BillTypeEnum } from '../bill.types';
import { createZodDto } from 'nestjs-zod';

export const BillSchema = z.object({
  user_id: z.number(),
  account_id: z.number(),
  currency_id: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
});

export class BillDto extends createZodDto(BillSchema) {}
