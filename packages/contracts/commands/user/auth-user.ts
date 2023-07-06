import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const AuthUserRequstSchema = z.object({
  name: z.string().min(1).max(128),
  password: z.string().min(3).max(256),
});

const RegisterUserResponseSchema = z.object({
  name: z.string().min(1).max(128),
});

const LoginUserResponseSchema = z.object({
  accessToken: z.string(),
});
export namespace User {
  export class Request extends createZodDto(AuthUserRequstSchema) {}
  export class RegisterResponse extends createZodDto(RegisterUserResponseSchema,) {}
  export class LoginResponse extends createZodDto(LoginUserResponseSchema,) {}
}

