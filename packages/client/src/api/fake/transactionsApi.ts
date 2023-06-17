import { createEvent, createStore } from "effector";

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

export const addTransaction = createEvent<ICreateTransaction>();
export const changeTransaction = createEvent<ITransactionWithId>();
export const removeTransaction = createEvent<number>();

export const $transactionsStore = createStore<ITransactionWithId[]>(fakeTransactions)
  .on(addTransaction, (store, payload) => [
    ...store,
    { id: store.sort((a, b) => a.id - b.id)[0].id + 1, ...payload },
  ])
  .on(changeTransaction, (store, changedTransaction) => [
    ...store.filter((transaction) => transaction.id !== changedTransaction.id),
    changedTransaction,
  ])
  .on(removeTransaction, (store, id) => [
    ...store.filter((transaction) => transaction.id !== id),
  ]);
