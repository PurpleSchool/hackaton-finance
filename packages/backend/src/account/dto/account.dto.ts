import { createZodDto } from "nestjs-zod";
import { Account, FindAccount, FindAccountsBy } from "../../../../contracts";

export namespace AccountDto {
  export class Request extends createZodDto(Account.RequestSchema) {}
  export class Response extends createZodDto(Account.ResponseSchema) {}
}

export namespace FindAccountsByDto { 
  export class Request {}
  export class Response extends createZodDto(FindAccountsBy.ResponseSchema) {}
}

export namespace FindAccountDto {
  export class Request extends createZodDto(FindAccount.RequestSchema) {}
  export class Response extends createZodDto(FindAccount.ResponseSchema) {}
  export class ResponseBalance extends createZodDto(FindAccount.ResponseBalanceSchema) {}
}