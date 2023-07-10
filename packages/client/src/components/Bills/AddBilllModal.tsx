import { Box, Modal, Typography } from "@mui/material";
import styles from "./bill.module.css";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import { $currencyStore } from "../../store/CurrencyStore";
import { $pickedAccount } from "../../store/AccountStore";

type AddBillModalProps = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddBilllModal(props: AddBillModalProps) {
  const pickedAcc = useStore($pickedAccount);
  const {
    // register,
    // handleSubmit,
    // watch,
    // formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      accountId: pickedAcc?.id || 0,
      currencyId: pickedAcc?.currencyId || 0,
      type: "",
      status: "",
      date: new Date(Date.now()),
    },
  });

  
  const currencyList = useStore($currencyStore);
  return (
    <Modal open={props.open} onClose={() => props.handleClose(false)}>
      <Box component={"form"} className={styles.modal_container}></Box>
    </Modal>
  );
}
