import { ITransactionWithId, ITransaction } from "../api/fake/transactionsApi";
import { IBillWithId, IBill } from "../api/fake/billApi";

export function TransactionWithId(
  transaction: ITransactionWithId | ITransaction
): transaction is ITransactionWithId {
  return "id" in transaction;
}

export function BillWithId(bill: IBillWithId | IBill): bill is IBillWithId {
  return "id" in bill;
}
