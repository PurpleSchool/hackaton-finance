import { Button } from "@mui/material";
import { useStore } from "effector-react";
import { Dispatch, SetStateAction, useState } from "react";
import { $billStore, BillProps, addBill } from "../api/fake/fakeApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Transaction from "./Transaction";

type BillFormProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
};
export type transaction = {
  id: number;
  category: string;
  value: number;
};

export default function BillForm(props: BillFormProps) {
  const billStore = useStore($billStore);
  const { register, handleSubmit, reset } = useForm<BillProps>();
  const [transactions, setTransactions] = useState<transaction[]>([
    {
      id: 0,
      category: "",
      value: 0,
    },
  ]);

  const onSubmit: SubmitHandler<BillProps> = (data) => {
    addBill({
      id: billStore.length + 1,
      category: transactions.sort((a, b) => a.value - b.value)[0].category,
      totalValue: transactions.reduce((acc, cur) => acc + cur.value, 0),
      status: 1,
      type: 0,
      currency: "",
      date: new Date(),
    });
    reset(); // Not working for some reason
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
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            setTransactions={setTransactions}
            transactions={transactions}
          />
        ))}
        <Button
          onClick={() => {
            setTransactions([
              ...transactions,
              {
                id: transactions.length,
                category: "",
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
