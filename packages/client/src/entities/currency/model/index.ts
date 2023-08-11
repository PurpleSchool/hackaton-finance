import { createStore } from "effector";
import { currencyApi } from "..";
import { GetCurrency } from "../../../../../contracts";
import { useStore } from "effector-react";

const initialCurrencyStore = await currencyApi
  .get()
  .then((res) => res.data)
  .catch((e) => e);

 const $currencyStore = createStore<GetCurrency.Response>(
  Array.isArray(initialCurrencyStore) ? initialCurrencyStore : []
);

export const useCurrensies =() => useStore($currencyStore)
