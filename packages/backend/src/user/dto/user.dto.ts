import * as z from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1).max(128),
  password: z.string().min(3).max(255),
});

export type UserDto = z.infer<typeof UserSchema>;
