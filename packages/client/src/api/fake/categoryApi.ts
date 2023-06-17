import { createEvent, createStore } from "effector";

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
  (store, payload) => [
    ...store,
    { id: store.sort((a, b) => a.id - b.id)[0].id + 1, ...payload },
  ]
);
