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
  deleteAccount,
} from "../api/account";
import { ICustomError } from "../entities/Errors";
import { FindAccount, FindAccountsBy } from "../../../contracts";

const updateAccountsStoreFx = createEffect<
  FindAccountsBy.Request,
  FindAccountsBy.Response,
  ICustomError
>(async () => {
  return (await findAccountsByOwner()).data;
});
export const getAccountsByOwner = createEvent<FindAccountsBy.Response>();
sample({
  clock: getAccountsByOwner,
  filter: updateAccountsStoreFx.pending.map((pedding) => !pedding),
  target: updateAccountsStoreFx,
});
export const $accountsStore = createStore<FindAccountsBy.Response>([]).on(
  getAccountsByOwner,
  (_, accounts) => accounts
);

const addAccountFx = createEffect<AccountDto, AccountRes, ICustomError>(
  async (data) => {
    return (await createAccount(data)).data;
  }
);
export const $addAccountRegError = createStore<ICustomError | null>(null).on(
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

const deleteAccountFx = createEffect<
  number,
  FindAccount.Response,
  ICustomError
>(async (id) => {
  return (await deleteAccount(id)).data;
});

export const deleteAccountEvent = createEvent<FindAccount.Request>();
