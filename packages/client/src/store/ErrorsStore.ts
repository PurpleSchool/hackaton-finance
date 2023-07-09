import { createEvent, createStore } from "effector";
import { $addAccountRegError, $getAccountsError } from "./AccountStore";
import { $getCurrencyErrorStore } from "./CurrencyStore";

const addError = createEvent<Error>();
export const $errorsStore = createStore<Error[] | null>(null).on(
  addError,
  (store, error) =>
    store !== null
      ? store?.find((er) => er.message === error.message)
        ? store
        : [...store, error]
      : [error]
);

$addAccountRegError.watch((error) => {
  if (error) {
    addError(error);
  }
});
$getAccountsError.watch((error) => {
  if (error) {
    addError(error);
  }
});
$getCurrencyErrorStore.watch((error) => {
  if (error) {
    addError(error);
  }
});
