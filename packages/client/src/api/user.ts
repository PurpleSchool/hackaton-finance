import { AxiosResponse } from "axios";
import { request } from "../http";
import { User } from "../../../contracts";

export type UserDto = User.Request;

export const regUser = async (
  data: UserDto
): Promise<AxiosResponse<User.RegisterResponse>> => {
  const responce = await request<User.RegisterResponse>({
    method: "post",
    url: "user/register",
    data: { ...data },
  });
  return responce;
};

export const loginUser = async (
  data: UserDto
): Promise<AxiosResponse<User.LoginResponse>> => {
  const response = await request<User.LoginResponse>({
    method: "post",
    url: "user/login",
    data: { ...data },
  });
  return response;
};
