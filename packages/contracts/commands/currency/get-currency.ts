import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';


const GetAllCurrencyResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
  }),
);

export namespace GetCurrency {
  export class Response extends createZodDto(GetAllCurrencyResponseSchema,) {}
}