import { createEvent, createStore } from "effector";

export type Account = {
  id: number;
  name: string;
  owner_id: number;
};

const fakeAccounts: Account[] = [
  {
    id: 1,
    name: "Tinkoff Debit",
    owner_id: 1,
  },
];


export const addAccount = createEvent<Account>();
export const $accountsStore = createStore<Account[]>(fakeAccounts).on(
  addAccount,
  (store, account) => [...store, account]
);
