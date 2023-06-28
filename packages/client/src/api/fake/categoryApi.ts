import { createEvent, createStore } from "effector";
import { v4 as uuidv4 } from "uuid";

export interface ICategory {
  name: string;
}
export interface ICategoryWithId extends ICategory {
  id: number;
}

const fakeCategorys: ICategoryWithId[] = [
  { id: 1, name: "Grossery" },
  { id: 2, name: "Alcohol" },
  { id: 3, name: "Taxi" },
];

export const addCategory = createEvent<ICategory>();
export const $categorysStore = createStore<ICategoryWithId[]>(fakeCategorys).on(
  addCategory,
  (store, payload) => [...store, { id: parseInt(uuidv4()), ...payload }]
);
