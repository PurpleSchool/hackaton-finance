import { createEvent, createStore } from "effector";

export const setUser = createEvent<string>();
export const logoutUser = createEvent();

export const $userStore = createStore<string | null>(null)
  .on(setUser, (_, payload) => payload)
  .reset(logoutUser);

$userStore.watch((name) => console.log(name));
