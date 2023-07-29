import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { Account } from "../../../../../contracts";
import { accountApi } from "..";

export const createFx = createEffect<Account.Request, Account.Response, Error>(
  async (data: Account.Request) =>
    await accountApi
      .create(data)
      .then((res) => res.data)
      .catch((e) => e)
);

export const create = createEvent<Account.Request>();

export const changeName = createEvent<string>();
const $name = createStore<string>("").on(changeName, (_, name) => name);

export const changeCurrency = createEvent<number>();
const $currency = createStore<number>(0).on(
  changeCurrency,
  (_, currencyId) => currencyId
);

const $accountCreateFormDataStore = combine<Account.Request>({
  name: $name,
  currencyId: $currency,
});

sample({
  clock: create,
  source: $accountCreateFormDataStore,
  filter: createFx.pending.map((pending) => !pending),
  target: createFx,
});
