import { GetCategory, CategoryTypeEnum } from "../../../contracts";
import { AxiosResponse } from "axios";
import { request } from "../http";

export const getCategoriesByType = async (
  type: CategoryTypeEnum
): Promise<AxiosResponse<GetCategory.Response>> => {
  const response = await request<GetCategory.Response>({
    method: "get",
    url: `category/by-type?type=${type}`,
  });
  return response;
};
