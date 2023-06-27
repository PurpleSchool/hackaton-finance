import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BillTypeEnum } from './bill.types';


export const GetTransactionsRequestSchema = z.object({
    accountId: z.number(),
    limit: z.number().max(20),
    offset: z.number().max(20),


});

export const GetTransactionsResponseSchema = z.array(z.object({
    transactionId: z.number(),
    accountId: z.number(),
    currencyId: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    date: z.coerce.date(),
    sum: z.number().nullable(),
    categoryId: z.number(),

}));

export class GetTransactionsResponse extends createZodDto(GetTransactionsResponseSchema) { }
export class GetTransactionsRequest extends createZodDto(GetTransactionsRequestSchema) { }

