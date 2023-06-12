import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as z from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (result.success === false) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    return result.data;
  }
}
