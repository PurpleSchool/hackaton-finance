import { z } from 'zod';
import { CategoryTypeEnum } from './category.types';

const CategorySchema = 
  z.object({
    id: z.number(),
    name: z.string(),
    type: z.nativeEnum(CategoryTypeEnum),
  });

export namespace GetCategory {
  export const RequestSchema = CategorySchema.pick({type: true})
  export const ResponseSchema = z.array(CategorySchema)

  export type Request = z.infer<typeof RequestSchema>
  export type Response = z.infer<typeof ResponseSchema>
}