import { z } from 'zod';
import { AccountSchema } from '../../models';

export namespace FindAccountsBy {
  export const RequestSchema = z.void()
  export const ResponseSchema = z.array(AccountSchema)

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}
