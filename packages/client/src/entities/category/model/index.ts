import { createEffect, createStore } from "effector";
import { GetCategory } from "../../../../../contracts";
import { categoryApi } from "..";
import { useStore } from "effector-react";

//EXPENSE

const updateExpenseCategoriesFx = createEffect<
  categoryApi.CategoryTypeEnum,
  GetCategory.Response,
  Error
>(
  async () =>
    await categoryApi
      .get(categoryApi.CategoryTypeEnum.EXPENSE)
      .then((res) => res.data)
      .catch((err) => err)
);

const initialExpenseCategoryStoreValue = await updateExpenseCategoriesFx(
  categoryApi.CategoryTypeEnum.EXPENSE
);
const $expenseCategoryStore = createStore<GetCategory.Response>(
  initialExpenseCategoryStoreValue
).on(updateExpenseCategoriesFx.doneData, (_, categories) => categories);

export const useExpense = () => useStore($expenseCategoryStore);

//INCOME

const updateIncomeCategoriesFx = createEffect<
  categoryApi.CategoryTypeEnum,
  GetCategory.Response,
  Error
>(
  async () =>
    await categoryApi
      .get(categoryApi.CategoryTypeEnum.INCOME)
      .then((res) => res.data)
      .catch((err) => err)
);

const initialIncomeCategoryStoreValue = await updateIncomeCategoriesFx(
  categoryApi.CategoryTypeEnum.INCOME
);
const $incomeCategoryStore = createStore<GetCategory.Response>(
  initialIncomeCategoryStoreValue
).on(updateIncomeCategoriesFx.doneData, (_, categories) => categories);

export const useIncome = () => useStore($incomeCategoryStore);
