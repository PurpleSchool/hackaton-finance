import { GetCategory } from "../../../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../../../shared/api";

//FIX ME: For some reason enums from contracts doesnt works
export enum CategoryTypeEnum {
  EXPENSE = "expense",
  INCOME = "income",
}

export const get = async (
  catType: string
): Promise<AxiosResponse<GetCategory.Response>> => {
  const response = await request<GetCategory.Response>({
    params: { type: catType },
    method: "get",
    url: "http://localhost:3000/category/by-type",
  });
  return response;
};
