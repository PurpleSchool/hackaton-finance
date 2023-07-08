import { GetCurrency } from "../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../http";

export type currencyList = GetCurrency.Response

export const getCurrency = async (): Promise<
  AxiosResponse<GetCurrency.Response>
> => {
  const response = await request<GetCurrency.Response>({
    method: "get",
    url: "currency",
  });
  return response;
};
