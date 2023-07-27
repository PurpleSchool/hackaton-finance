import { z } from 'nestjs-zod/z';

const AuthUserSchema = z.object({
  name: z.string().min(1).max(128),
  password: z.string().min(3).max(256),
});

const LoginUserResponseSchema = z.object({
  accessToken: z.string(),
});
export namespace User {
  export const RequestSchema = AuthUserSchema
  export const RegisterResponseSchema = AuthUserSchema.pick({name: true})
  export const LoginResponseSchema = LoginUserResponseSchema

  export type Request = z.infer<typeof RequestSchema>
  export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
  export type LoginResponse = z.infer<typeof LoginResponseSchema>
}

