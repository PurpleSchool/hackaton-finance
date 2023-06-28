import { z } from 'zod';
import { BillTypeEnum } from '../bill/bill.types';

export const GetCategoryResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(BillTypeEnum),
  }),
);
