import { useStore } from "effector-react";
import { FindAccount } from "../../../../../contracts";
import { createEvent, createStore } from "effector";

export const resetPicked = createEvent();
export const setPicked = createEvent<FindAccount.Response>();
const $picked = createStore<FindAccount.Response | null>(null)
  .on(setPicked, (_, acc) => acc)
  .reset(resetPicked);

export const usePicked = () => useStore($picked);
