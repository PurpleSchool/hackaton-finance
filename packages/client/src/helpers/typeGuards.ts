import { ITransactionWithId, ITransaction } from "../api/fake/transactionsApi";
import { IBillWithId, IBill } from "../api/fake/billApi";

export function isTransactionOld(
  transaction: ITransactionWithId | ITransaction
): transaction is ITransactionWithId {
  return "id" in transaction;
}

export function isBillOld(bill: IBillWithId | IBill): bill is IBillWithId {
  return "id" in bill;
}
