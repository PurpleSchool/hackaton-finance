import { z } from "zod";
import { AccountSchema } from "../../models";

export const FindAccountSchema = z.object({
  id: z.string().transform((value) => Number(value)),
});

export namespace FindAccount {
  export const RequestSchema = FindAccountSchema;
  export const ResponseSchema = AccountSchema;

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}
