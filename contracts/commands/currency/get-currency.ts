import { z } from 'zod';

export const GetAllCurrencyResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
  }),
);
