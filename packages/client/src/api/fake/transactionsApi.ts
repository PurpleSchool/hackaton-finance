import { createEvent, createStore } from "effector";
import { v4 as uuidv4 } from "uuid";

export interface ITransaction {
  category_id: number;
  value: number;
}

export interface ITransactionWithId extends ITransaction {
  id: number;
  bill_id: number;
}

interface ICreateTransaction extends ITransaction {
  bill_id: number;
}

const fakeTransactions: ITransactionWithId[] = [
  {
    id: 1,
    category_id: 1,
    value: 20,
    bill_id: 1,
  },
  {
    id: 2,
    category_id: 2,
    value: 10,
    bill_id: 1,
  },
];

export const addTransaction = createEvent<ICreateTransaction>();
export const updateTransaction = createEvent<ITransactionWithId>();
export const removeTransaction = createEvent<number>();

export const $transactionsStore = createStore<ITransactionWithId[]>(
  fakeTransactions
)
  .on(addTransaction, (store, newTransaction) => [
    ...store,
    { ...newTransaction, id: parseInt(uuidv4()) },
  ])
  .on(updateTransaction, (store, updatedTransaction) => [
    ...store.filter((transaction) => transaction.id !== updatedTransaction.id),
    updatedTransaction,
  ])
  .on(removeTransaction, (store, id) => [
    ...store.filter((transaction) => transaction.id !== id),
  ]);
