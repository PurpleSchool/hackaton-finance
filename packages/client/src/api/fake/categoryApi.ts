import { createEvent, createStore } from "effector";

export type Category = {
  id: number;
  name: string;
  color: string;
};

const fakeCategorys: Category[] = [
  { id: 1, name: "Grossery", color: "blue" },
  { id: 2, name: "Alcohol", color: "green" },
  { id: 3, name: "Taxi", color: "yellow" },
];

export const addCategory = createEvent<Category>();
export const $categorysStore = createStore<Category[]>(fakeCategorys).on(
  addCategory,
  (store, category) => [...store, category]
);
