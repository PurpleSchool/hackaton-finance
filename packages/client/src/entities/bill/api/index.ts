import { AxiosResponse } from "axios";
import { CreateBill, FindBill, FindBillsBy } from "../../../../../contracts";
import { request } from "../../../shared";

//FIX ME: For some reason enums from contracts doesnt works
export enum BillStatusEnum {
  CANCELED = "canceled",
  COMPLETED = "completed",
  PENDING = "pending",
}

export enum BillTypeEnum {
  EXPENSE = "expense",
  INCOME = "income",
}

export const create = async (
  data: CreateBill.Request
): Promise<AxiosResponse<CreateBill.Response>> => {
  const response = await request<CreateBill.Response>({
    method: "post",
    url: "bill/create",
    data: data,
  });
  return response;
};

export const update = async (
  data: FindBill.Request
): Promise<AxiosResponse<FindBill.Response>> => {
  const response = await request<FindBill.Response>({
    method: "patch",
    url: `bill/${data.id}`,
    data: data,
  });
  return response;
};

export const remove = async (
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

export const findByAccount = async (
  accId: number
): Promise<AxiosResponse<FindBillsBy.Response>> => {
  const response = await request<FindBillsBy.Response>({
    method: "get",
    url: `bill/by-account/${accId}`,
  });
  return response;
};

export const findByUser = async (): Promise<
  AxiosResponse<FindBillsBy.Response>
> => {
  const response = await request<FindBillsBy.Response>({
    method: "get",
    url: `bill/by-user`,
  });
  return response;
};
