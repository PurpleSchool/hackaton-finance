import { createZodDto } from "nestjs-zod";
import { User } from "../../../../contracts";

export namespace UserDto {
  export class Request extends createZodDto(User.RequestSchema) {}
  export class RegisterResponse extends createZodDto(User.RegisterResponseSchema) {}
  export class LoginResponse extends createZodDto(User.LoginResponseSchema) {}
}