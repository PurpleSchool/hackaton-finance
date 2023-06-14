import { createEvent, createStore } from "effector";

const fakeKategory: Category[] = [
  {
    id: 1,
    name: "Grossery",
    icon: "KitchenIcon",
    color: "var(--blue)",
  },
];
export type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};
export const addCategory = createEvent<Category>();
export const $categoryStore = createStore<Category[]>(fakeKategory).on(
  addCategory,
  (store, category) => [...store, category]
);

const fakeBillProps: BillProps[] = [
  {
    id: 1,
    category: "Grossery",
    totalValue: 200,
    status: 1,
    type: 0,
    currency: "$",
    date: new Date(2023, 5, 6),
  },
];

export type BillProps = {
  id: number;
  category: string;
  totalValue: number;
  status: number;
  type: number;
  currency: string;
  date: Date;
};
export const addBill = createEvent<BillProps>();
export const $billStore = createStore<BillProps[]>(fakeBillProps).on(
  addBill,
  (store, bill) => [...store, bill]
);
