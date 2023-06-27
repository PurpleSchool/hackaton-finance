import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AccountSchema = z.object({
  name: z.string().min(1).max(256),
});

export class AccountDto extends createZodDto(AccountSchema) {}
