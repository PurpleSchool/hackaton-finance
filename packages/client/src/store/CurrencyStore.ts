import { createStore } from "effector";
import { currencyList, getCurrency } from "../api/currency";

const initialCurrencyStore = await getCurrency();

export const $currencyStore = createStore<currencyList>(
  initialCurrencyStore.data
);
