import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { AccountSchema } from "../../models";
export const FindAccountSchema = z.object({
  id: z.string().transform((value) => Number(value)),
});

export namespace FindAccount {
  export class Request extends createZodDto(FindAccountSchema) {}
  export class Response extends createZodDto(AccountSchema) {}
}
