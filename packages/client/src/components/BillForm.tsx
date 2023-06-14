import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useStore } from "effector-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { $billsStore, BillType, upsertBill } from "../api/fake/billApi";
import {
  $transactionsStore,
  TransactionType,
  upsertTransaction,
} from "../api/fake/transactionsApi";
import TransactionForm from "./TransactionForm";
import { $currencysStore } from "../api/fake/currencyApi";

type BillFormProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  bill?: BillType;
};

export default function BillForm(props: BillFormProps) {
  const currencyList = useStore($currencysStore);
  const bills = useStore($billsStore);
  const bill = props.bill || {
    id: 0,
    user_id: 1,
    account_id: 1,
    currency_id: 0,
    type: 0,
    status: 1,
    date: Date.now(),
    created_at: Date.now(),
  };

  const billsTransactions = useStore($transactionsStore).filter(
    (transaction) => transaction.bill_id === bill.id
  );

  const [transactions, setTransactions] = useState<TransactionType[]>(
    billsTransactions.length !== 0
      ? billsTransactions
      : [
          {
            id: 1,
            bill_id: bill.id,
            category_id: 0,
            value: 0,
          },
        ]
  );

  const { register, handleSubmit, reset } = useForm<BillType>();

  const onSubmit: SubmitHandler<BillType> = (data) => {
    upsertBill({
      id: bill.id === 0 ? bills.length + 1 : bill.id,
      user_id: 1,
      account_id: 1,
      currency_id: data.currency_id,
      type: data.type,
      status: data.status,
      date: new Date(Date.now()),
    });
    transactions.map((transaction) => upsertTransaction(transaction));
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
              label="Cyrrency"
              {...register("currency_id")}
              sx={{ width: "150px" }}
            >
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
              <MenuItem value={0}>Expense</MenuItem>
              <MenuItem value={1}>Income</MenuItem>
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
              <MenuItem value={0}>Failure</MenuItem>
              <MenuItem value={1}>Success</MenuItem>
            </Select>
          </FormControl>
        </div>
        {transactions.map((transaction) => (
          <TransactionForm
            key={transaction.id}
            transaction={transaction}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        ))}
        <Button
          onClick={() => {
            setTransactions([
              ...transactions,
              {
                id: transactions.length + 1,
                category_id: 0,
                value: 0,
                bill_id: bill.id,
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
