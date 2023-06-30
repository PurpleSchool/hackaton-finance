import { z } from 'zod';
import { CategoryTypeEnum } from './category.types';
import { createZodDto } from 'nestjs-zod';


const GetCategoryResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(CategoryTypeEnum),
  }),
);

export class CategoryResponseDto extends createZodDto(
  GetCategoryResponseSchema,
) {}