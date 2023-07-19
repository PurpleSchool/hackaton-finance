import { z } from 'zod';


const GetAllCurrencyResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
  }),
);

export namespace GetCurrency {
  export const RequestSchema = z.void()
  export const ResponseSchema = GetAllCurrencyResponseSchema

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}