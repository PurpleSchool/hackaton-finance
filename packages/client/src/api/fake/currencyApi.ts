import { createEvent, createStore } from "effector";

export type Currency = {
  id: number;
  name: string;
  sign: string;
};

const fakeCurrencys: Currency[] = [
  {
    id: 1,
    name: "USD",
    sign: "$",
  },
  {
    id: 2,
    name: "RUB",
    sign: "₽",
  },
  {
    id: 3,
    name: "EUR",
    sign: "€",
  },
];

export const addCurrency = createEvent<Currency>();
export const $currencysStore = createStore<Currency[]>(fakeCurrencys).on(
  addCurrency,
  (store, currency) => [...store, currency]
);
