import { z } from 'zod';

export const GetAccountsByOwnerResponseSchema = z.array(
  z.object({
    name: z.string().min(1).max(256),
    owner_id: z.number(),
    id: z.number(),
  }),
);
