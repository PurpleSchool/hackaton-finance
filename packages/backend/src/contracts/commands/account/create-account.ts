import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateAccountRequestSchema = z.object({
  name: z.string().min(1).max(256),
});

export const CreateAccountResponseSchema = z.object({
  name: z.string().min(1).max(256),
  owner_id: z.number(),
  id: z.number(),
});

export class CreateAccountDto extends createZodDto(
  CreateAccountRequestSchema,
) {}
