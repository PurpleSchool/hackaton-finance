import { GetCurrency } from "../../../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../../../shared/api";


const get = async (): Promise<
  AxiosResponse<GetCurrency.Response>
> => {
  const response = await request<GetCurrency.Response>({
    method: "get",
    url: "currency",
  });
  return response;
};

export const currencyApi = {get}