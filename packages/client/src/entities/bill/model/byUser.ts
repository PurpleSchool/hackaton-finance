import { createEffect, createEvent, createStore } from "effector";
import { billApi } from "../..";
import { FindBillsBy } from "../../../../../contracts";
import { useStore } from "effector-react";

const setUsersBillsEmpty = createEvent();
export const updateUsersBillsFx = createEffect<
  null,
  FindBillsBy.Response,
  Error
>(
  async () =>
    await billApi
      .findByUser()
      .then((res) => res.data)
      .catch((e) => {
        if ("response" in e && e.response.status === 404) {
          setUsersBillsEmpty();
        } else {
          return e;
        }
      })
);

const initialUsersBillsStore = await updateUsersBillsFx(null);

const $usersBillsStore = createStore<FindBillsBy.Response>(
  initialUsersBillsStore
)
  .on(updateUsersBillsFx.doneData, (_, bills) => bills)
  .on(setUsersBillsEmpty, (_) => []);

export const useUsersBills = () => useStore($usersBillsStore);
