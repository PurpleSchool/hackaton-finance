import { Account, FindAccount, FindAccountsBy } from "../../../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../../../shared";

const create = async (
  data: Account.Request
): Promise<AxiosResponse<Account.Response>> => {
  const responce = await request<Account.Response>({
    method: "post",
    url: "account/create",
    data: data,
  });
  return responce;
};

const findById = async (
  id: FindAccount.Request
): Promise<AxiosResponse<FindAccount.Response>> => {
  const responce = await request<FindAccount.Response>({
    method: "get",
    url: "account/" + id,
  });
  return responce;
};

const findByOwner = async (): Promise<
  AxiosResponse<FindAccountsBy.Response>
> => {
  const responce = await request<FindAccountsBy.Response>({
    method: "get",
    url: "account/by-owner",
  });
  return responce;
};

const remove = async (
  id: number
): Promise<AxiosResponse<FindAccount.Response>> => {
  const responce = await request<FindAccount.Response>({
    method: "delete",
    url: "account/" + id,
  });
  return responce;
};

const getBalance = async (
  id: number
): Promise<AxiosResponse<FindAccount.ResponseBalance>> => {
  const responce = await request<FindAccount.ResponseBalance>({
    method: "get",
    url: "account/" + id + "/balance",
  });
  return responce;
};

export const accountApi = { getBalance, remove, findById, findByOwner, create };
