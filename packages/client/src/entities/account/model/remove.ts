import { accountApi } from "../api";

export const remove = async (id: number) => {
  await accountApi.remove(id);
};
