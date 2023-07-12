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

//CREATE ACCOUNT

const createAccountFx = createEffect<AccountDto, AccountRes, Error>(
  async (data: AccountDto) =>
    await createAccount(data)
      .then((res) => res.data)
      .catch((err) => err)
);
export const $createAccountRegError = createStore<Error | null>(null).on(
  createAccountFx.failData,
  (_, err) => {
    err;
  }
);

export const createAccountEvent = createEvent<AccountDto>();

export const resetCreateAccountPeding = createEvent();
export const $createAccountPending = createStore<boolean>(false)
  .on(createAccountFx.doneData, (_) => true)
  .reset(resetCreateAccountPeding);

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
  clock: createAccountEvent,
  source: $accountCreateFormDataStore,
  filter: createAccountFx.pending.map((pending) => !pending),
  target: createAccountFx,
});

export const resetPickedAccount = createEvent();
export const setPickedAccount = createEvent<FindAccount.Response>();
export const $pickedAccount = createStore<FindAccount.Response | null>(null)
  .on(setPickedAccount, (_, account) => account)
  .reset(resetPickedAccount);
