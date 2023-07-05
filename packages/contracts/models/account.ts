import { z } from "zod";
import { zodToTs, printNode,withGetType } from "zod-to-ts";

export const AccountSchema = z.object({
  name: z.string().min(1).max(256),
  ownerId: z.number(),
  id: z.number(),
});
