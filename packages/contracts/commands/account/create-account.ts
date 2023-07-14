import { createZodDto } from "nestjs-zod";
import { AccountSchema } from "../../models";

export namespace Account {
  export class Request extends createZodDto(AccountSchema.pick({name:true, currencyId:true })) {}
  export class Response extends createZodDto(AccountSchema) {}
}
