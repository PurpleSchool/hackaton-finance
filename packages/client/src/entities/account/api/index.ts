import { Account, FindAccount, FindAccountsBy } from "../../../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../../../shared";

export const create = async (
  data: Account.Request
): Promise<AxiosResponse<Account.Response>> => {
  const responce = await request<Account.Response>({
    method: "post",
    url: "account/create",
    data: data,
  });
  return responce;
};

export const findById = async (
  id: FindAccount.Request
): Promise<AxiosResponse<FindAccount.Response>> => {
  const responce = await request<FindAccount.Response>({
    method: "get",
    url: "account/" + id,
  });
  return responce;
};

export const findByOwner = async (): Promise<
  AxiosResponse<FindAccountsBy.Response>
> => {
  const responce = await request<FindAccountsBy.Response>({
    method: "get",
    url: "account/by-owner",
  });
  return responce;
};

export const remove = async (
  id: number
): Promise<AxiosResponse<FindAccount.Response>> => {
  const responce = await request<FindAccount.Response>({
    method: "delete",
    url: "account/" + id,
  });
  return responce;
};
