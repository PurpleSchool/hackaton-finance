import { createEffect, createEvent, createStore } from "effector";
import { FindAccountsBy } from "../../../../../contracts";
import { accountApi } from "../api";
import { useStore } from "effector-react";

export const updateAccountsFx = createEffect<
  null,
  FindAccountsBy.Response,
  Error
>(() =>
  accountApi
    .findByOwner()
    .then((res) => res.data)
    .catch((e) => {
      console.error(e);
      if ("response" in e && e.response.staus === 404) {
        setAccountsStoreEmpty();
      } else {
        return e;
      }
    })
);

const setAccountsStoreEmpty = createEvent();
const initialAccountsStore = await updateAccountsFx(null);

const $accountsStore = createStore<FindAccountsBy.Response>(
  initialAccountsStore
)
  .on(updateAccountsFx.doneData, (_, data) => data)
  .on(setAccountsStoreEmpty, (_) => []);

export const useAccounts = () => useStore($accountsStore)