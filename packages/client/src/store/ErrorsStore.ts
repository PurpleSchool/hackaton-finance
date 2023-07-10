import { createEvent, createStore } from "effector";
import { $addAccountRegError, $getAccountsError } from "./AccountStore";
import { $getCurrencyErrorStore } from "./CurrencyStore";
import { $usersBillsErrorStore, $accounsBillsErrorStore } from "./BillStore";
// import {
//   $updateExpenseCategoriesErrorStore,
//   $updateIncomeCategoriesErrorStore,
// } from "./CategoryStore";

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
$usersBillsErrorStore.watch((error) => {
  if (error) {
    addError(error);
  }
});
$accounsBillsErrorStore.watch((error) => {
  if (error) {
    addError(error);
  }
});
// $updateExpenseCategoriesErrorStore.watch((error) => {
//   if (error) {
//     addError(error);
//   }
// });

// $updateIncomeCategoriesErrorStore.watch((error) => {
//   if (error) {
//     addError(error);
//   }
// });
