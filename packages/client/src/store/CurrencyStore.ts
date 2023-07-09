import { createEffect, createEvent, createStore } from "effector";
import { currencyList, getCurrency } from "../api/currency";

const addGetCurrencyError = createEvent<Error>();
export const $getCurrencyErrorStore = createStore<Error | null>(null).on(
  addGetCurrencyError,
  (_, error) => error
);

const initialCurrencyStore = await getCurrency()
  .then((res) => res.data)
  .catch((e) => {
    addGetCurrencyError(e);
    return e;
  });
export const $currencyStore = createStore<currencyList>(
  Array.isArray(initialCurrencyStore) ? initialCurrencyStore : []
);
