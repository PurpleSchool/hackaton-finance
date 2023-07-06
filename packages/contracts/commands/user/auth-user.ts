import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const AuthUserSchema = z.object({
  name: z.string().min(1).max(128),
  password: z.string().min(3).max(256),
});

const LoginUserResponseSchema = z.object({
  accessToken: z.string(),
});
export namespace User {
  export class Request extends createZodDto(AuthUserSchema) {}
  export class RegisterResponse extends createZodDto(AuthUserSchema.pick({name: true}),) {}
  export class LoginResponse extends createZodDto(LoginUserResponseSchema,) {}
}

