import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { TransactionType } from "../../entities/formTypes";
import { GetCategory } from "../../../../contracts";

type TransactionFormType = {
  transaction: TransactionType;
  categories: GetCategory.Response;
  handleChange: (changedTransaction: TransactionType) => void;
};

export default function TransactionForm(props: TransactionFormType) {
  const handleChangeCategory = (e: SelectChangeEvent<number>) => {
    const data = {
      id: props.transaction.id,
      sum: props.transaction.sum,
      categoryId: Number(e.target.value),
    };
    props.handleChange(data);
  };
  const handleChangeSum = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const data = {
      id: props.transaction.id,
      sum: Number(e.target.value),
      categoryId: props.transaction.categoryId,
    };
    props.handleChange(data);
  };

  return (
    <>
      {/* CATEGORY */}
      <FormControl sx={{ width: "45%" }}>
        <InputLabel id={`${props.transaction.id}transaction-category-label`}>
          Category
        </InputLabel>
        <Select
          id={`${props.transaction.id}transaction-category-select`}
          labelId={`${props.transaction.id}transaction-category-label`}
          label="Category"
          value={props.transaction.categoryId}
          onChange={(e) => handleChangeCategory(e)}
        >
          <MenuItem value={0}>Not selected</MenuItem>
          {props.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* SUM */}
      <TextField
        sx={{ width: "45%" }}
        label="Sum"
        id={`${props.transaction.id}transaction-sum-input`}
        type="number"
        value={props.transaction.sum}
        onChange={(e) => handleChangeSum(e)}
      />
    </>
  );
}
