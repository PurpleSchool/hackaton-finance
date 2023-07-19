import { z } from 'zod';

export const GetExchangeRateRequestSchema = z.object({
  toCurrency: z.string(),
  fromCurrencies: z.array(z.string()),
  date: z.string().optional(),
});

export const GetExchangeRateResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.number(),
  historical: z.boolean(),
  base: z.string(),
  date: z.number().optional(),
  rates: z.record(z.number()),
});
export const GetExchangeRateBadResponseSchema = z.object({
  success: z.boolean(),
  error: z.object({
    code: z.number(),
    type: z.string(),
    info: z.string(),
  }),
});

export namespace Exchange {
  export const RequestSchema = GetExchangeRateRequestSchema
  export const ResponseSchema = GetExchangeRateResponseSchema
  export const BadResponseSchema = GetExchangeRateBadResponseSchema

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
  export type BadResponse = z.infer<typeof BadResponseSchema>
}
