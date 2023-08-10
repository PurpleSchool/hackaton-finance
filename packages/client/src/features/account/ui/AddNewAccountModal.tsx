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
import styles from "./account.module.css";
import { useEffect } from "react";
import { Account, FindAccountsBy } from "../../../../../contracts";
import { accountModel, currencyModel } from "../../../entities";
import { FormValidationError } from "../..";

type AddNewAccountModalProps = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  accountsList: FindAccountsBy.Response;
  handleCloseModalWithSubmit: () => void;
};

export function AddNewAccountModal(props: AddNewAccountModalProps) {
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

  accountModel.changeName(watch("name"));
  accountModel.changeCurrency(watch("currencyId"));

  useEffect(() => {
    if (accountModel.createFx.pending.__ === true) {
      props.handleCloseModalWithSubmit();
    }
  }, [accountModel.createFx.pending]);

  const onSubmit: SubmitHandler<Account.Request> = (data) => {
    accountModel.create(data);
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose(false)}
      disableScrollLock
    >
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
              validate: {
                isUniq: (name) =>
                  Array.isArray(props.accountsList)
                    ? props.accountsList.find(
                        (account) => account.name === name
                      ) === undefined ||
                      "You already have the account with this name"
                    : true,
              },
            })}
          />
          <FormControl>
            <InputLabel id="accountForm-currency-label">Currency</InputLabel>
            <Select
              className={styles["account-currency-select"]}
              id="accountForm-currency-select"
              labelId="accountForm-currency-label"
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
              {currencyModel.useCurrensies().map((currency) => (
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
