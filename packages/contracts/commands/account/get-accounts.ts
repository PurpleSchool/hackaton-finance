import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { AccountSchema } from '../../models';

export namespace FindAccountsBy {
  export class Request {}
  export class Response extends createZodDto(z.array(AccountSchema)) {}
}
