import { AccountSchema } from "../../models";
import { z } from 'zod';

export namespace Account {
  export const RequestSchema = AccountSchema.pick({name:true, currencyId:true })
  export const ResponseSchema = AccountSchema

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}
