import {
  Autocomplete,
  AutocompleteChangeDetails,
  TextField,
  AutocompleteChangeReason,
  Button,
} from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { TransactionType } from "../api/fake/transactionsApi";
import { $categorysStore } from "../api/fake/categoryApi";
import { useStore } from "effector-react";

type TransactionFormProps = {
  transaction: TransactionType;
  transactions: TransactionType[];
  setTransactions: Dispatch<SetStateAction<TransactionType[]>>;
};

export default function TransactionForm(props: TransactionFormProps) {
  const categories = useStore($categorysStore);
  const [isNewCategoryRequired, setIsNewCategoryRequired] = useState(false);

  const handleChangeCategory = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ): void => {
    const newTransactions = props.transactions.map((transaction) =>
      transaction.id === props.transaction.id
        ? {
            id: transaction.id,
            category_id: categories.filter(
              (category) => category.name === value
            )[0].id,
            value: transaction.value,
            bill_id: transaction.bill_id,
            
          }
        : transaction
    );
    props.setTransactions(newTransactions);
  };

  const handleChangeValue = (event: { target: { value: string } }): void => {
    const newTransactions = props.transactions.map((transaction) =>
      transaction.id === props.transaction.id
        ? {
            id: transaction.id,
            category_id: transaction.category_id,
            value: Number(event.target.value),
            bill_id: transaction.bill_id,
            
          }
        : transaction
    );
    props.setTransactions(newTransactions);
  };

  const handleDeleteTransaction = (): void => {
    props.setTransactions([
      ...props.transactions.filter(
        (transaction) => transaction.id !== props.transaction.id
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
        options={categories.map((category) => category.name)}
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
      {/* {isNewCategoryRequired ? <CreateCategoty /> : null} */}

      <TextField
        type="number"
        label="Value"
        onChange={handleChangeValue}
        sx={{ width: "100%" }}
      />
    </div>
  );
}
