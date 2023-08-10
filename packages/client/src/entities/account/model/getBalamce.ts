import { createEffect } from "effector";
import { FindAccount } from "../../../../../contracts";
import { accountApi } from "../api";

export const getBalanceFx = createEffect<
  FindAccount.Request,
  FindAccount.ResponseBalance
>(async (data: FindAccount.Request) => 
  await accountApi
    .getBalance(data.id)
    .then((res) => res.data)
    .catch((e) => e)
);



