import { createZodDto } from "nestjs-zod";
import { AccountSchema } from "../../models";

export namespace FindAccount {
  export class Request extends createZodDto(AccountSchema.pick({ id: true })) {}
  export class Response extends createZodDto(AccountSchema) {}
}
