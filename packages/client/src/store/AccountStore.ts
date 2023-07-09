import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import {
  AccountDto,
  AccountRes,
  createAccount,
  findAccountsByOwner,
} from "../api/account";

import { FindAccountsBy } from "../../../contracts";

const addGetAccountsError = createEvent<Error>();
export const $getAccountsError = createStore<Error | null>(null).on(
  addGetAccountsError,
  (_, error) => error
);

const updateAccountsStoreAfterError = createEvent();

export const updateAccountsStoreFx = createEffect<
  null,
  FindAccountsBy.Response,
  Error
>(() =>
  findAccountsByOwner()
    .then((res) => res.data)
    .catch((e) => {
      if ("response" in e) {
        if (e.response.status === 404) {
          updateAccountsStoreAfterError();
        } else {
          addGetAccountsError(e);
        }
      }

      return e;
    })
);

const initialAccountsStore = await updateAccountsStoreFx(null);

export const $accountsStore = createStore<FindAccountsBy.Response>(
  initialAccountsStore
)
  .on(updateAccountsStoreFx.doneData, (_, data) => data)
  .on(updateAccountsStoreFx.failData, (store) => store)
  .on(updateAccountsStoreAfterError, (_) => []);

const addAccountFx = createEffect<AccountDto, AccountRes, Error>(
  async (data) => {
    return (await createAccount(data)).data;
  }
);
export const $addAccountRegError = createStore<Error | null>(null).on(
  addAccountFx.fail,
  (_, err) => {
    err;
  }
);

export const addAccount = createEvent<AccountDto>();

export const nameChanged = createEvent<string>();
const $name = createStore<string>("").on(nameChanged, (_, name) => name);

export const currencyChanged = createEvent<number>();
const $currency = createStore<number>(0).on(
  currencyChanged,
  (_, currencyId) => currencyId
);

const $accountCreateFormDataStore = combine<AccountDto>({
  name: $name,
  currencyId: $currency,
});

sample({
  clock: addAccount,
  source: $accountCreateFormDataStore,
  filter: addAccountFx.pending.map((pending) => !pending),
  target: addAccountFx,
});
