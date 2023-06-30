import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateAccountRequestSchema = z.object({
  name: z.string().min(1).max(256),
});

const AccountResponseSchema = z.object({
  name: z.string().min(1).max(256),
  owner_id: z.number(),
  id: z.number(),
});

export class CreateAccountDto extends createZodDto(
  CreateAccountRequestSchema,
) {}

export class AccountResponseDto extends createZodDto(
  AccountResponseSchema,
) {}