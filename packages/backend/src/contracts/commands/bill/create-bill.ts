import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BillStatusEnum, BillTypeEnum } from './bill.types';

export const CreateBillSchema = z.object({
    userId: z.number(),
    accountId: z.number(),
    currencyId: z.number(),
    type: z.nativeEnum(BillTypeEnum),
    date: z.coerce.date(),
    transactions: z.array(z.object({
        sum: z.number(),
        categoryId: z.number(),
    }))
});

export class CreateBillDto extends createZodDto(CreateBillSchema) { }
