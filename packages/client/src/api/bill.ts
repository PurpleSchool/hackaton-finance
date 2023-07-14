import { request } from "../http";
import { CreateBill, FindBill, FindBillsBy } from "../../../contracts";
import { AxiosResponse } from "axios";

export enum BillStatusEnum {
  CANCELED = "canceled",
  COMPLETED = "completed",
  PENDING = "pending",
}

export enum BillTypeEnum {
  EXPENSE = "expense",
  INCOME = "income",
}

export const createBill = async (
  data: CreateBill.Request
): Promise<AxiosResponse<CreateBill.Response>> => {
  const response = await request<CreateBill.Response>({
    method: "post",
    url: "bill/create",
    data: data,
  });
  return response;
};

export const updateBill = async (
  data: FindBill.Request
): Promise<AxiosResponse<FindBill.Response>> => {
  const response = await request<FindBill.Response>({
    method: "patch",
    url: `bill/${data.id}`,
    data: data,
  });
  return response;
};

export const deleteBill = async (
  id: number
): Promise<AxiosResponse<FindBill.Response>> => {
  const response = await request<FindBill.Response>({
    method: "delete",
    url: `bill/${id}`,
  });
  return response;
};

export const findBillById = async (
  id: number
): Promise<AxiosResponse<FindBill.Response>> => {
  const response = await request<FindBill.Response>({
    method: "get",
    url: `bill/${id}`,
  });
  return response;
};

export const findBillsByAccount = async (
  accId: number
): Promise<AxiosResponse<FindBillsBy.Response>> => {
  const response = await request<FindBillsBy.Response>({
    method: "get",
    url: `bill/by-account/${accId}`,
  });
  return response;
};

export const findBillsByUser = async (): Promise<
  AxiosResponse<FindBillsBy.Response>
> => {
  const response = await request<FindBillsBy.Response>({
    method: "get",
    url: `bill/by-user`,
  });
  return response;
};
