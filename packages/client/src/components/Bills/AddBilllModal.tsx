import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import styles from "./bill.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "effector-react";
import { $currencyStore } from "../../store/CurrencyStore";
import { $accountsStore, $pickedAccount } from "../../store/AccountStore";
import { CreateBill } from "../../../../contracts";
import { createBillFx } from "../../store/BillStore";
import { BillStatusEnum, BillTypeEnum } from "../../api/bill";
import { useEffect, useId, useState } from "react";
import { CustomSwitch } from "../CustomSwitch";
import BasicDateTimePicker from "../DateTimePicker";
import { TransactionType } from "../../entities/formTypes";
import TransactionForm from "./transactionForm";
import {
  $expenseCategoryStore,
  $incomeCategoryStore,
} from "../../store/CategoryStore";

type AddBillModalProps = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddBilllModal(props: AddBillModalProps) {
  const pickedAcc = useStore($pickedAccount);
  const accountsList = useStore($accountsStore);
  const currenciesList = useStore($currencyStore);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      accountId: pickedAcc?.id || 0,
      currencyId: pickedAcc?.currencyId || 0,
      type: BillTypeEnum.EXPENSE,
      status: BillStatusEnum.PENDING,
      date: new Date(Date.now()),
      transactions: [{ sum: 0, categoryId: 0 }],
    },
  });

  const onSubmit: SubmitHandler<CreateBill.Request> = (data) => {
    createBillFx(data);
    props.handleClose(false);
  };
  const accountId = watch("accountId");
  useEffect(() => {
    setValue(
      "currencyId",
      accountsList.find((acc) => acc.id === accountId)?.currencyId || 0
    );
  }, [accountId]);

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      "type",
      event.target.checked ? BillTypeEnum.INCOME : BillTypeEnum.EXPENSE
    );
  };

  const handleChangeDate = (date: Date | undefined) => {
    if (date !== undefined) {
      setValue("date", date);
    }
  };

  const [transactionsList, setTransactionsList] = useState<TransactionType[]>([
    { id: useId(), sum: 0, categoryId: 0 },
  ]);

  const handleAddTransaction = () => {
    setTransactionsList([
      ...transactionsList,
      { id: useId(), sum: 0, categoryId: 0 },
    ]);
  };

  const handleChangeTransactions = (changedTransaction: TransactionType) => {
    setTransactionsList([
      ...transactionsList.map((transaction) =>
        transaction.id === changedTransaction.id
          ? changedTransaction
          : transaction
      ),
    ]);
  };

  useEffect(() => {
    setValue(
      "transactions",
      transactionsList.map((transaction) => {
        const { id, ...data } = transaction;

        return data;
      })
    );
  }, [transactionsList]);

  const categoriesList =
    watch("type") === "expense"
      ? useStore($expenseCategoryStore)
      : useStore($incomeCategoryStore);

  return (
    <Modal open={props.open} onClose={() => props.handleClose(false)}>
      <Box
        component={"form"}
        className={styles.modal_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formRow}>
          {/* ACCOUNT */}
          <FormControl sx={{ width: "45%" }}>
            <InputLabel id="billForm-account-label">Account</InputLabel>
            <Select
              id="billForm-accoount-select"
              labelId="billForm-account-label"
              label="Account"
              defaultValue={pickedAcc?.id || 0}
              {...register("accountId", {
                required: "Please select an account",
                min: { value: 1, message: "Please select an account" },
              })}
            >
              <MenuItem value={0}>
                <Typography>Not selected</Typography>
              </MenuItem>
              {accountsList.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* CURRENCY */}
          <FormControl sx={{ width: "45%" }}>
            <InputLabel id="billForm-currency-label">Currency</InputLabel>
            <Select
              id="billForm-currency-select"
              labelId="billForm-currency-label"
              label="Currency"
              defaultValue={pickedAcc?.currencyId || 0}
              disabled={true}
              value={watch("currencyId")}
              {...register("accountId", {
                required: "Please select a currency",
                min: { value: 1, message: "Please select a currency" },
              })}
            >
              <MenuItem value={0}>
                <Typography>Not selected</Typography>
              </MenuItem>
              {currenciesList.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formRow}>
          {/* TYPE */}
          <FormControlLabel
            sx={{ width: "25%", margin: "8px 0px 0px 0px" }}
            control={
              <CustomSwitch onChange={(event) => handleChangeType(event)} />
            }
            label={"Type: " + watch("type")}
            labelPlacement="top"
          />
          {/* STATUS */}
          <FormControl sx={{ width: "25%", marginTop: "8px" }}>
            <InputLabel id="billForm-status-label">Status</InputLabel>
            <Select
              id="billForm-status-select"
              labelId="billForm-status-label"
              label="Status"
              defaultValue={BillStatusEnum.PENDING}
              {...register("status", {
                required: true,
              })}
            >
              <MenuItem value={BillStatusEnum.PENDING}>
                <Typography color="primary">Pending</Typography>
              </MenuItem>
              <MenuItem value={BillStatusEnum.COMPLETED}>
                <Typography color="green">Completed</Typography>
              </MenuItem>
              <MenuItem value={BillStatusEnum.CANCELED}>
                <Typography color="red">Canceled</Typography>
              </MenuItem>
            </Select>
          </FormControl>
          {/* DATE */}
          <BasicDateTimePicker
            value={watch("date")}
            handleChange={handleChangeDate}
          />
        </div>
        {transactionsList.map((transaction) => (
          <div key={transaction.id} className={styles.formRow}>
            <TransactionForm
              transaction={transaction}
              categories={categoriesList}
              handleChange={handleChangeTransactions}
            />
          </div>
        ))}
        <Button
          variant="text"
          onClick={() => handleAddTransaction()}
          sx={{ marginTop: "20px" }}
          disabled={true}
        >
          + add transaction
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid}
          sx={{ marginTop: "20px" }}
        >
          Save the Bill
        </Button>
      </Box>
    </Modal>
  );
}
