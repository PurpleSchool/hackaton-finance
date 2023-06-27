import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  BillTypeEnum,
  BillStatusEnum,
} from '../../contracts/commands/bill/bill.types';

export const BillSchema = z.object({
  account_id: z.number(),
  currency_id: z.number(),
  type: z.nativeEnum(BillTypeEnum),
  status: z.nativeEnum(BillStatusEnum),
  date: z.coerce.date(),
});

export class BillDto extends createZodDto(BillSchema) {}
