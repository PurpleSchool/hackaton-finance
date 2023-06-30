import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';


const GetAccountsByOwnerResponseSchema = z.array(
  z.object({
    name: z.string().min(1).max(256),
    owner_id: z.number(),
    id: z.number(),
  }),
);


export class GetAccountsByResponseDto extends createZodDto(GetAccountsByOwnerResponseSchema) {}
