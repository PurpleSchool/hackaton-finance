import { createEffect } from "effector";
import { CreateBill } from "../../../../../contracts";
import { billApi } from "../..";

export const createBillFx = createEffect<
  CreateBill.Request,
  CreateBill.Response,
  Error
>(
  async (data: CreateBill.Request) =>
    await billApi
      .create(data)
      .then((res) => res.data)
      .catch((e) => e)
);
