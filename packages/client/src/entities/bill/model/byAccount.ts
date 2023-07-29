import { createEffect, createEvent, createStore } from "effector";
import { FindBillsBy } from "../../../../../contracts";
import { billApi } from "../..";
import { useStore } from "effector-react";

export const resetAccBills = createEvent();
export const updateAccBillsFx = createEffect<
  number,
  FindBillsBy.Response,
  Error
>(
  async (accId: number) =>
    await billApi
      .findByAccount(accId)
      .then((res) => res.data)
      .catch((e) => {
        if ("response" in e && e.response.status === 404) {
        } else {
          return e;
        }
      })
);

const $AccounsBillsStore = createStore<FindBillsBy.Response>([])
  .on(updateAccBillsFx.doneData, (_, bills) => bills)
  .reset(resetAccBills);

export const useAccBills = () => useStore($AccounsBillsStore);
