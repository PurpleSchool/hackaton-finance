import { CreateBill, CreateTransaction, FindBill, FindBillsBy, FindTransaction, FindTransactionsBy } from "../../../../contracts";
import { createZodDto } from "nestjs-zod";


export namespace CreateBillDto {
	export class Request extends createZodDto(CreateBill.RequestSchema) {}
	export class Response extends createZodDto(CreateBill.ResponseSchema) {}
}

export namespace FindBillDto {
	export class Request extends createZodDto(FindBill.RequestSchema) {}
	export class Response extends createZodDto(FindBill.ResponseSchema) {}
}

export namespace FindBillsByDto {
  export class AccountRequest extends createZodDto(FindBillsBy.AccountRequestSchema) {}
	export class Response extends createZodDto(FindBillsBy.ResponseSchema) {}
}

export namespace CreateTransactionDto {
	export class Request extends createZodDto(CreateTransaction.RequestSchema) {}
	export class Response extends createZodDto(CreateTransaction.ResponseSchema) {}
}
export namespace FindTransactionDto {
  export class Request extends createZodDto(FindTransaction.RequestSchema) {}
  export class Response extends createZodDto(FindTransaction.ResponseSchema) {}
}

export namespace FindTransactionsByDto {
	export class RequestBill extends createZodDto(FindTransactionsBy.RequestBillSchema) {}
	export class Response extends createZodDto(FindTransactionsBy.ResponseSchema) {}
}
