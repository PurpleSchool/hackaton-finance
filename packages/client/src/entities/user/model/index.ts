import { createEffect, createEvent, createStore } from "effector";
import { useStore } from "effector-react";
import { User } from "../../../../../contracts";
import { userApi } from "..";

const setName = createEvent<string>();

export const loginFx = createEffect<User.Request, User.LoginResponse, Error>(
  async (data: User.Request) =>
    await userApi
      .login(data)
      .then((res) => res.data)
      .then((res) => {
        localStorage.setItem("token", res.accessToken);
        setName(data.name);
      })
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
  .on(setName, (_, payload) => {
    localStorage.setItem("user", payload);
    return payload;
  })
  .on(logout, () => null);

export const useName = () => useStore($userStore);
