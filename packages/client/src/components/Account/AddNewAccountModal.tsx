import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { $currencyStore } from "../../store/CurrencyStore";
import { useStore } from "effector-react";
import { AccountDto } from "../../api/account";
import FormValidationError from "../Form/FormValidationError";
import {
  addAccount,
  currencyChanged,
  nameChanged,
} from "../../store/AccountStore";
import styles from "./account.module.css";

type AddNewAccountModalProps = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewAccountModal(props: AddNewAccountModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      currencyId: 0,
    },
  });
  const currencyList = useStore($currencyStore);

  nameChanged(watch("name"));
  currencyChanged(watch("currencyId"));

  const onSubmit: SubmitHandler<AccountDto> = (data) => {
    addAccount(data);
    props.handleClose(false);
  };

  const handleClose = async () => {
    props.handleClose(false);
  };

  return (
    <Modal open={props.open} onClose={() => handleClose()}>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.modal_container}
      >
        <div className={styles["modal-form_container"]}>
          <TextField
            className={styles["account-name"]}
            id="account-name"
            label="Name"
            variant="outlined"
            {...register("name", {
              required: "You have to name this account",
              minLength: { value: 2, message: "Minimum 2 character required" },
              maxLength: { value: 128, message: "Maximum 128 character" },
            })}
          />
          <FormControl>
            <InputLabel id="account-currency-label">Currency</InputLabel>
            <Select
              className={styles["account-currency-select"]}
              id="account-currency-select"
              labelId="account-currency-label"
              label="Currency"
              defaultValue={0}
              {...register("currencyId", {
                required: "Please select a currency",
                min: { value: 1, message: "Please select a currency" },
              })}
            >
              <MenuItem value={0}>
                <Typography>Not selected</Typography>
              </MenuItem>
              {currencyList.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  <Typography>{currency.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormValidationError
            error={errors.name ? errors.name : errors.currencyId}
          />
        </div>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Add Account
        </Button>
      </Box>
    </Modal>
  );
}
