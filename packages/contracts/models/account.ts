import { z } from "zod";

export const AccountSchema = z.object({
  name: z.string().min(1).max(256),
  ownerId: z.number(),
  currencyId: z.number(),
  id: z.number(),
});
