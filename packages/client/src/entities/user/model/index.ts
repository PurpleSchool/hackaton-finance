import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "../../../../../contracts";
import { userApi } from "..";

type loginData = User.LoginResponse & { name: string };

export const loginFx = createEffect<User.Request, loginData, Error>(
  async (data: User.Request) =>
    await userApi
      .login(data)
      .then((res) => res.data)
      .catch((e) => e)
);

export const registrationFx = createEffect<User.Request, User.RegisterResponse>(
  async (data: User.Request) =>
  await userApi
  .registration(data)
  .then((res) => res.data)
  .catch((e) => e)
  );
  
export const logout = createEvent();

const initialStore = localStorage.getItem("user") || null;

const $userStore = createStore<string | null>(initialStore)
  .on(loginFx.doneData, (_, payload) => {
    localStorage.setItem("user", payload.name);
    return payload.name;
  })
  .on(logout, () => null);

export const useName =() => useStore($userStore);
