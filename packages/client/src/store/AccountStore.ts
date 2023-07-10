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

import { FindAccountsBy, FindAccount } from "../../../contracts";

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
          setAccountsStoreEmpty();
        } else {
          addGetAccountsError(e);
        }
      }
      return e;
    })
);
const addGetAccountsError = createEvent<Error>();
export const $getAccountsError = createStore<Error | null>(null)
  .on(addGetAccountsError, (_, error) => error)
  .on(updateAccountsStoreFx.failData, (_, err) => err);

const setAccountsStoreEmpty = createEvent();

const initialAccountsStore = await updateAccountsStoreFx(null);

export const $accountsStore = createStore<FindAccountsBy.Response>(
  initialAccountsStore
)
  .on(updateAccountsStoreFx.doneData, (_, data) => data)
  .on(setAccountsStoreEmpty, (_) => []);

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

export const resetAddAccountPeding = createEvent();
export const $addAccountPending = createStore<boolean>(false)
  .on(addAccountFx.doneData, (_) => true)
  .reset(resetAddAccountPeding);

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

export const resetPickedAccount = createEvent();
export const setPickedAccount = createEvent<FindAccount.Response>();
export const $pickedAccount = createStore<FindAccount.Response | null>(null)
  .on(setPickedAccount, (_, account) => account)
  .reset(resetPickedAccount);

$pickedAccount.watch((acc) =>
  console.log(acc === null ? "no acc picked" : acc.id)
);
