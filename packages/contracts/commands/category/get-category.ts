import { z } from 'zod';
import { CategoryTypeEnum } from './category.types';
import { createZodDto } from 'nestjs-zod';

const CategorySchema = 
  z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(CategoryTypeEnum),
  });

export namespace GetCategory {
  export class Request extends createZodDto(CategorySchema.pick({type: true})) {}
  export class Response extends createZodDto(z.array(CategorySchema)) {}
}