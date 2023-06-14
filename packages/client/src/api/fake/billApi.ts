import { createEvent, createStore } from "effector";

export type BillType = {
  id: number;
  user_id: number;
  account_id: number;
  currency_id: number;
  type: 0 | 1;
  status: 0 | 1;
  date: Date;
  
};

const fakeBills: BillType[] = [
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
export const upsertBill = createEvent<BillType>();
export const $billsStore = createStore<BillType[]>(fakeBills)
  .on(removeBill, (store, payload) => [
    ...store.filter((bill) => bill.id !== payload),
  ])
  .on(upsertBill, (store, changedBill) => [
    ...store.filter((bill) => bill.id !== changedBill.id, changedBill),
  ]);
