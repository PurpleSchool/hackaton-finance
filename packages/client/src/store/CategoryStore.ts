import { createEffect, createStore } from "effector";
import { GetCategory, CategoryTypeEnum } from "../../../contracts";
import { getCategoriesByType } from "../api/category";

//EXPENSE
export const updateExpenseCategoryFx = createEffect<
  CategoryTypeEnum,
  GetCategory.Response,
  Error
>(
  async () =>
    await getCategoriesByType(CategoryTypeEnum.EXPENSE)
      .then((res) => res.data)
      .catch((err) => err)
);

export const $updateExpenseCategoriesErrorStore = createStore<Error | null>(
  null
).on(updateExpenseCategoryFx.failData, (_, err) => err);

const initialExpenseCategoryStoreValue = await updateExpenseCategoryFx(
  CategoryTypeEnum.EXPENSE
);
export const $expenseCategoryStore = createStore<GetCategory.Response>(
  initialExpenseCategoryStoreValue
).on(updateExpenseCategoryFx.doneData, (_, categories) => categories);

//INCOME
export const updateIncomeCategoryFx = createEffect<
  CategoryTypeEnum,
  GetCategory.Response,
  Error
>(
  async () =>
    await getCategoriesByType(CategoryTypeEnum.INCOME)
      .then((res) => res.data)
      .catch((err) => err)
);

export const $updateIncomeCategoriesErrorStore = createStore<Error | null>(
  null
).on(updateIncomeCategoryFx.failData, (_, err) => err);

const initialIncomeCategoryStoreValue = await updateIncomeCategoryFx(
  CategoryTypeEnum.INCOME
);
export const $incomeCategoryStore = createStore<GetCategory.Response>(
  initialIncomeCategoryStoreValue
).on(updateExpenseCategoryFx.doneData, (_, categories) => categories);

$incomeCategoryStore.watch((cat) => console.log(cat));
$expenseCategoryStore.watch((cat) => console.log(cat));
