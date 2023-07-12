import {
  Box,
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
import { useEffect } from "react";
import { CustomSwitch } from "../CustomSwitch";
import BasicDateTimePicker from "../DateTimePicker";

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

    // formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      accountId: pickedAcc?.id || 0,
      currencyId: pickedAcc?.currencyId || 0,
      type: BillTypeEnum.EXPENSE,
      status: BillStatusEnum.PENDING,
      date: new Date(Date.now()),
      transactions: [],
    },
  });
  const onSubmit: SubmitHandler<CreateBill.Request> = (data) => {
    createBillFx(data);
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

  console.log(watch("date"));

  return (
    <Modal open={props.open} onClose={() => props.handleClose(false)}>
      <Box
        component={"form"}
        className={styles.modal_container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* ACCOUNT */}
          <FormControl>
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
          <FormControl>
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
          {/* TYPE */}
          <FormControlLabel
            control={
              <CustomSwitch onChange={(event) => handleChangeType(event)} />
            }
            label={"Type: " + watch("type")}
            labelPlacement="top"
          />
          {/* STATUS */}
          <FormControl>
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
          <BasicDateTimePicker  />
        </div>
      </Box>
    </Modal>
  );
}
