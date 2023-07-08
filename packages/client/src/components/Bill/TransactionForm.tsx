import {
  Autocomplete,
  AutocompleteChangeDetails,
  TextField,
  AutocompleteChangeReason,
  Button,
} from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { ITransactionWithId, ITransaction } from "../api/fake/transactionsApi";
import { $categorysStore } from "../api/fake/categoryApi";
import { useStore } from "effector-react";
import { TransactionWithId } from "../helpers/typeGuards";
import { TransactionsType } from "../entities/formTypes";
import CreateCategoty from "./CreateCategoty";

type TransactionFormProps = {
  transaction: ITransactionWithId | ITransaction;
  transactions: TransactionsType[];
  setTransactions: Dispatch<SetStateAction<TransactionsType[]>>;
};

export default function TransactionForm(props: TransactionFormProps) {
  const categories = useStore($categorysStore);
  const [isNewCategoryRequired, setIsNewCategoryRequired] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const handleChangeCategory = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ): void => {
    const newTransactions = props.transactions.map((transaction) =>
      TransactionWithId(transaction)
        ? transaction.category_id === props.transaction.category_id
          ? {
              id: transaction.id,
              category_id: categories.filter(
                (category) => category.name === value
              )[0].id,
              value: transaction.value,
              bill_id: transaction.bill_id,
            }
          : transaction
        : transaction.category_id === props.transaction.category_id
        ? {
            category_id: categories.filter(
              (category) => category.name === value
            )[0].id,
            value: transaction.value,
          }
        : transaction
    );

    props.setTransactions(newTransactions);
  };

  const handleChangeValue = (event: { target: { value: string } }): void => {
    const newTransactions = props.transactions.map((transaction) =>
      TransactionWithId(transaction)
        ? transaction.category_id === props.transaction.category_id
          ? {
              id: transaction.id,
              category_id: transaction.category_id,
              value: Number(event.target.value),
              bill_id: transaction.bill_id,
            }
          : transaction
        : transaction.category_id === props.transaction.category_id
        ? {
            category_id: transaction.category_id,
            value: Number(event.target.value),
          }
        : transaction
    );

    props.setTransactions(newTransactions);
  };

  const handleDeleteTransaction = (): void => {
    props.setTransactions([
      ...props.transactions.filter(
        (transaction) =>
          transaction.category_id !== props.transaction.category_id
      ),
    ]);
  };

  const handleChangeNewCategoryName = (e: { target: { value: string } }) => {
    setNewCategoryName(e.target.value);
  };

  return (
    <div>
      <Button size="small" onClick={handleDeleteTransaction}>
        delete
      </Button>
      <Autocomplete
        onClick={() => setIsNewCategoryRequired(false)}
        options={categories.map((category) => category.name)}
        defaultValue={
          TransactionWithId(props.transaction)
            ? categories.filter(
                (category) => category.id === props.transaction.category_id
              )[0].name
            : null
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Сategory"
            onChange={handleChangeNewCategoryName}
          />
        )}
        onChange={handleChangeCategory}
        noOptionsText={
          <Button
            variant="text"
            color="success"
            onClick={() => {
              setIsNewCategoryRequired(true);
            }}
          >
            + Add new category
          </Button>
        }
      />
      <CreateCategoty
        open={isNewCategoryRequired}
        setOpen={setIsNewCategoryRequired}
        name={newCategoryName}
      />

      <TextField
        type="number"
        label="Value"
        onChange={handleChangeValue}
        defaultValue={
          TransactionWithId(props.transaction) ? props.transaction.value : null
        }
        sx={{ width: "100%" }}
      />
    </div>
  );
}
