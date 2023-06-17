import { createEvent, createStore } from "effector";

export interface IBill {
  user_id: number;
  account_id: number;
  currency_id: number;
  type: 0 | 1;
  status: 0 | 1;
  date: Date;
}

export interface IBillWithId extends IBill {
  id: number;
}

const fakeBills: IBillWithId[] = [
  {
    id: 1,
    user_id: 1,
    account_id: 1,
    currency_id: 1,
    type: 0,
    status: 1,
    date: new Date(6, 10, 23),
  },
];


export const removeBill = createEvent<number>();
export const addBill = createEvent<IBill>();
export const changeBill = createEvent<IBillWithId>();

export const $billsStore = createStore<IBillWithId[]>(fakeBills)
  .on(removeBill, (store, id) => [...store.filter((bill) => bill.id !== id)])
  .on(addBill, (store, bill) =>  [
    ...store,
    { id: store.sort((a, b) => a.id - b.id)[0].id + 1, ...bill },
  ])
  .on(changeBill, (store, changedBill) => [
    ...store.filter((bill) => bill.id !== changedBill.id),
    changedBill,
  ]);
