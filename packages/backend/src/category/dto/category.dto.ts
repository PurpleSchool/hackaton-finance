import { createZodDto } from "nestjs-zod";
import { GetCategory } from "../../../../contracts";

export namespace GetCategoryDto {
  export class Request extends createZodDto(GetCategory.RequestSchema) {}
  export class Response extends createZodDto(GetCategory.ResponseSchema) {}
}