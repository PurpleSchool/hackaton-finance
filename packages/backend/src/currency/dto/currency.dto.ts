import { createZodDto } from "nestjs-zod";
import { Exchange, GetCurrency } from "../../../../contracts";

export namespace GetCurrencyDto {
  export class Request {}
  export class Response extends createZodDto(GetCurrency.ResponseSchema) {}
}

export namespace ExchangeDto {
  export class Request extends createZodDto(Exchange.RequestSchema) {}
  export class Response extends createZodDto(Exchange.ResponseSchema) {}
  export class BadResponse extends createZodDto(Exchange.BadResponseSchema) {}
}