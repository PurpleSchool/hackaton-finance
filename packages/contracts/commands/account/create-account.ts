import { createZodDto } from "nestjs-zod";
import { AccountSchema } from "../../models";

export namespace CreateAccount {
  export class Request extends createZodDto(
    AccountSchema.pick({ name: true })
  ) {}
  export class Response extends createZodDto(AccountSchema) {}
}
