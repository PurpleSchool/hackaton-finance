import { AxiosResponse } from "axios";
import { User } from "../../../../../contracts";
import { request } from "../../../shared/";

export const registration = async (
  data: User.Request
): Promise<AxiosResponse<User.RegisterResponse>> => {
  const responce = await request<User.RegisterResponse>({
    method: "post",
    url: "user/register",
    data: { ...data },
  });
  return responce;
};

export const login = async ( 
  data: User.Request
): Promise<AxiosResponse<User.LoginResponse>> => {
  const response = await request<User.LoginResponse>({
    method: "post",
    url: "user/login",
    data: { ...data },
  });
  return response;
};
