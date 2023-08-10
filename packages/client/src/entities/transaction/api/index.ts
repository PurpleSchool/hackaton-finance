import { AxiosResponse } from "axios";
import {
  FindTransaction,
  FindTransactionsBy,
  CreateTransaction,
} from "../../../../../contracts";
import { request } from "../../../shared";

const create = async (
  data: CreateTransaction.Request
): Promise<AxiosResponse<CreateTransaction.Response>> => {
  const response = await request<CreateTransaction.Response>({
    method: "post",
    url: "bill/transaction/create",
    data: data,
  });
  return response;
};

const findByID = async (
  data: FindTransaction.Request
): Promise<AxiosResponse<FindTransaction.Response>> => {
  const response = await request<FindTransaction.Response>({
    method: "get",
    url: "bill/transaction/" + data.id,
  });
  return response;
};

const remove = async (
  data: FindTransaction.Request
): Promise<AxiosResponse<FindTransaction.Response>> => {
  const response = await request<FindTransaction.Response>({
    method: "delete",
    url: "transaction/" + data.id,
  });
  return response;
};

const findByBillID = async (
  data: FindTransactionsBy.RequestBill
): Promise<AxiosResponse<FindTransactionsBy.Response>> => {
  const response = await request<FindTransactionsBy.Response>({
    method: "get",
    url: "bill/" + data.id + "transaction/by-bill",
  });
  return response;
};

export const transactionsApi = {
  create,
  findByBillID,
  findByID,
  remove,
};
