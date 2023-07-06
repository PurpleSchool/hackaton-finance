import { AxiosResponse } from "axios";
import { request } from "../../http";

export interface IUserAuthData {
  name: string;
  password: string;
}

export const regUser = async (
  data: IUserAuthData
): Promise<AxiosResponse<{ name: string }>> => {
  const responce = await request<{ name: string }>({
    method: "post",
    url: "user/register",
    data: { ...data },
  });
  return responce;
};

export const loginUser = async (
  data: IUserAuthData
): Promise<AxiosResponse<{ accessToken: string }>> => {
  const response = await request<{ accessToken: string }>({
    method: "post",
    url: "user/login",
    data: { ...data },
  });
  return response;
};
