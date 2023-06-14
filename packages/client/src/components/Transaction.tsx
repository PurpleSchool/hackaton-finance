import {
  Autocomplete,
  AutocompleteChangeDetails,
  TextField,
  AutocompleteChangeReason,
  Button,
} from "@mui/material";
import { useStore } from "effector-react";
import { $categoryStore } from "../api/fake/fakeApi";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { transaction } from "./BillForm";
import CreateCategoty from "./CreateCategoty";

type transactionProps = {
  setTransactions: Dispatch<SetStateAction<transaction[]>>;
  transactions: transaction[];
  id: number;
};

export default function Transaction(props: transactionProps) {
  const categories = useStore($categoryStore).map((category) => category.name);

  const [isNewCategoryRequired, setIsNewCategoryRequired] = useState(false);

  const handleChangeCategory = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ): void => {
    const newTransactions = props.transactions.map((transaction) =>
      transaction.id === props.id
        ? {
            id: transaction.id,
            category: value || "",
            value: transaction.value,
          }
        : transaction
    );
    props.setTransactions(newTransactions);
  };
  const handleChangeValue = (event: { target: { value: string } }): void => {
    const newTransactions = props.transactions.map((transaction) =>
      transaction.id === props.id
        ? {
            id: transaction.id,
            category: transaction.category,
            value: Number(event.target.value),
          }
        : transaction
    );
    props.setTransactions(newTransactions);
  };
  const handleDeleteTransaction = (): void => {
    props.setTransactions([
      ...props.transactions.filter(
        (transaction) => transaction.id !== props.id
      ),
    ]);
  };

  return (
    <div>
      <Button size="small" onClick={handleDeleteTransaction}>
        delete
      </Button>
      <Autocomplete
        onClick={() => setIsNewCategoryRequired(false)}
        options={categories}
        renderInput={(params) => <TextField {...params} label="Сategory" />}
        onChange={handleChangeCategory}
        noOptionsText={
          <Button
            variant="text"
            color="success"
            onClick={() => setIsNewCategoryRequired(true)}
          >
            + Add new category
          </Button>
        }
      />
      {isNewCategoryRequired ? <CreateCategoty /> : null}

      <TextField
        type="number"
        label="Value"
        onChange={handleChangeValue}
        sx={{ width: "100%" }}
      />
    </div>
  );
}
