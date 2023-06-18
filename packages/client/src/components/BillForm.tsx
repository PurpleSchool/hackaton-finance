import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useStore } from "effector-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  $billsStore,
  IBillWithId,
  IBill,
  addBill,
  changeBill,
} from "../api/fake/billApi";
import {
  $transactionsStore,
  addTransaction,
  changeTransaction,
} from "../api/fake/transactionsApi";
import { TransactionsType } from "../entities/formTypes";
import TransactionForm from "./TransactionForm";
import { $currencysStore } from "../api/fake/currencyApi";
import { isTransactionOld } from "../helpers/typeGuards";
import { isBillOld } from "../helpers/typeGuards";

type BillFormProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  bill?: IBillWithId;
};

export default function BillForm(props: BillFormProps) {
  const currencyList = useStore($currencysStore);
  const bills = useStore($billsStore);

  const { register, handleSubmit, reset, watch } = useForm<IBillWithId>();

  const bill: IBillWithId | IBill = props.bill || {
    user_id: 1,
    account_id: 1,
    currency_id: 0,
    type: 0,
    status: 1,
    date: new Date(Date.now()),
  };

  const [transactions, setTransactions] = useState<TransactionsType[]>(
    isBillOld(bill)
      ? useStore($transactionsStore).filter(
          (transaction) => transaction.bill_id === bill.id
        )
      : [
          {
            category_id: 0,
            value: 0,
          },
        ]
  );
  const [isNewTransactionEvalable, setIsNewTransactionAvalable] =
    useState<boolean>(true);
  useEffect(() => {
    transactions.map((transaction) => transaction.category_id).includes(0)
      ? setIsNewTransactionAvalable(false)
      : setIsNewTransactionAvalable(true);
  }, [transactions]);

  const onSubmit: SubmitHandler<IBillWithId> = (data) => {
    if (isBillOld(bill)) {
      changeBill(data);
      transactions.map((transaction) => {
        isTransactionOld(transaction)
          ? changeTransaction(transaction)
          : addTransaction({ bill_id: bill.id, ...transaction });
      });
    } else {
      transactions.map((transaction) =>
        addTransaction({
          ...transaction,
          bill_id: bills.sort((a, b) => a.id - b.id)[0].id + 1,
        })
      );
      addBill({
        user_id: 1,
        account_id: 1,
        currency_id: data.currency_id,
        type: data.type,
        status: data.status,
        date: new Date(Date.now()),
      });
    }
    reset();
    props.onClose(false);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Button
        variant="text"
        color="secondary"
        size="small"
        sx={{ width: "100px", alignSelf: "flex-end" }}
        onClick={() => props.onClose(false)}
      >
        Close
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency-select"
              label="Currency"
              defaultValue={bill.currency_id || 0}
              {...register("currency_id")}
              sx={{ width: "150px" }}
            >
              <MenuItem value={0}>not specified</MenuItem>
              {currencyList.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.sign}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="Type"
              defaultValue={bill.type}
              {...register("type")}
              sx={{ width: "150px" }}
            >
              <MenuItem value={0} sx={{ color: "red" }}>
                Expense
              </MenuItem>
              <MenuItem value={1} sx={{ color: "green" }}>
                Income
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              label="Status"
              defaultValue={bill.status}
              {...register("status")}
              sx={{ width: "150px" }}
            >
              <MenuItem value={0} sx={{ color: "red" }}>
                Failure
              </MenuItem>
              <MenuItem value={1} sx={{ color: "green" }}>
                Success
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {transactions.map((transaction) => (
          <TransactionForm
            key={transaction.category_id}
            transaction={transaction}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        ))}

        <Button
          disabled={!isNewTransactionEvalable}
          onClick={() => {
            setTransactions([
              ...transactions,
              {
                category_id: 0,
                value: 0,
              },
            ]);
          }}
        >
          + Add Transaction
        </Button>
        <input type="submit" value={"Save the Bill"} />
      </form>
    </div>
  );
}
