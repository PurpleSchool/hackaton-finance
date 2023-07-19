import { CreateBill, FindBill, FindBillsBy, GetTransaction } from "../../../../contracts";
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

export namespace GetTransactionDto {
  export class Request extends createZodDto(GetTransaction.RequestSchema) {}
  export class Response extends createZodDto(GetTransaction.ResponseSchema) {}
}
