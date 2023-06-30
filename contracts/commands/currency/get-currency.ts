import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';


const GetAllCurrencyResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
  }),
);

export class GetAllCurrencyResponseDto extends createZodDto(
  GetAllCurrencyResponseSchema,
) {}