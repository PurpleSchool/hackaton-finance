import { createEvent, createStore } from "effector";

export type TransactionType = {
  id: number;
  category_id: number;
  value: number;
  bill_id: number;
};

const fakeTransactions: TransactionType[] = [
  {
    id: 1,
    category_id: 1,
    value: 200,
    bill_id: 1,
  },
  {
    id: 2,
    category_id: 2,
    value: 100,
    bill_id: 1,
  },
];

export const upsertTransaction = createEvent<TransactionType>();
export const $transactionsStore = createStore<TransactionType[]>(
  fakeTransactions
).on(upsertTransaction, (store, changedTransaction) => [
  ...store.filter(
    (bill) => bill.id !== changedTransaction.id,
    changedTransaction
  ),
]);
