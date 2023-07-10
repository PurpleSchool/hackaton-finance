import { createEffect, createEvent, createStore } from "effector";
import { CreateBill, FindBill, FindBillsBy } from "../../../contracts";
import { findBillsByUser, findBillsByAccount } from "../api/bill";

//BY USER
const setUsersBillsStoreEmpty = createEvent();
export const updateUsersBillsStoreFx = createEffect<
  null,
  FindBillsBy.Response,
  Error
>(
  async () =>
    await findBillsByUser()
      .then((res) => res.data)
      .catch((e) => {
        if ("response" in e) {
          if (e.response.status === 404) {
            setUsersBillsStoreEmpty();
          } else {
            addGetUsersBillsError(e);
          }
        }
        return e;
      })
);

const addGetUsersBillsError = createEvent<Error>();
export const $usersBillsErrorStore = createStore<Error | null>(null)
  .on(addGetUsersBillsError, (_, err) => err)
  .on(updateUsersBillsStoreFx.failData, (_, err) => err);

const initialUsersBillsStore = await updateUsersBillsStoreFx(null);

export const $usersBillsStore = createStore<FindBillsBy.Response>(
  initialUsersBillsStore
)
  .on(updateUsersBillsStoreFx.doneData, (_, bills) => bills)
  .on(setUsersBillsStoreEmpty, (_) => []);

//by ACCOUNT
const setAccountsBillsStoreEmpty = createEvent();
export const updateAccounsBillsStoreFx = createEffect<
  FindBillsBy.AccountRequest,
  FindBillsBy.Response,
  Error
>(
  async (data: FindBillsBy.AccountRequest) =>
    await findBillsByAccount(data.accountId)
      .then((res) => res.data)
      .catch((e) => {
        if ("response" in e) {
          if (e.response.status === 404) {
            setAccountsBillsStoreEmpty();
          } else {
            addGetAccounsBillsError(e);
          }
        }
        return e;
      })
);

const addGetAccounsBillsError = createEvent<Error>();
export const $accounsBillsErrorStore = createStore<Error | null>(null)
  .on(addGetAccounsBillsError, (_, err) => err)
  .on(updateAccounsBillsStoreFx.failData, (_, err) => err);

export const $AccounsBillsStore = createStore<FindBillsBy.Response>([]).on(
  updateAccounsBillsStoreFx.doneData,
  (_, bills) => bills
);

