import { createEvent, createStore } from "effector";

export type User = {
  id: number;
  name: string;
};

const fakeUsers: User[] = [
  {
    id: 1,
    name: "John",
  },
];

export const addUser = createEvent<User>();
export const $usersStore = createStore<User[]>(fakeUsers).on(
  addUser,
  (store, user) => [...store, user]
);
