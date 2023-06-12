import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const UserSchema = z.object({
  name: z.string().min(1).max(128),
  password: z.string().min(3).max(256),
});
export class UserDto extends createZodDto(UserSchema) {}
