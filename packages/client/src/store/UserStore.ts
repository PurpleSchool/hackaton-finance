import { createEvent, createStore } from "effector";

interface IUserStore {
  userName: string | null;
}

export const setUser = createEvent<IUserStore>();
export const logoutUser = createEvent();

export const $userStore = createStore<IUserStore>({ userName: null })
  .on(setUser, (_, payload) => payload)
  .on(logoutUser, (store) => {
    store.userName = null;
  });
