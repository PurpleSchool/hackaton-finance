import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

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
  export class Request extends createZodDto(GetExchangeRateRequestSchema,) {}
  export class Response extends createZodDto(GetExchangeRateResponseSchema,) {}
  export class BadResponse extends createZodDto(GetExchangeRateBadResponseSchema,) {}
}
