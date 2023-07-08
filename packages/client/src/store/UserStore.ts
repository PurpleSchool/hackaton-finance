  import { createEvent, createStore } from "effector";

export const setUser = createEvent<string>();
export const logoutUser = createEvent();

const initialStore = localStorage.getItem("userStore") || null;

export const $userStore = createStore<string | null>(initialStore)
  .on(setUser, (_, payload) => payload)
  .reset(logoutUser);

$userStore.watch((store) => {
  store === null
    ? localStorage.removeItem("userStore")
    : localStorage.setItem("userStore", store);
});
