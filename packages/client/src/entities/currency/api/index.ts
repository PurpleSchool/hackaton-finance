import { GetCurrency } from "../../../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../../../shared/api";

export const get = async (): Promise<
  AxiosResponse<GetCurrency.Response>
> => {
  const response = await request<GetCurrency.Response>({
    method: "get",
    url: "currency",
  });
  return response;
};
