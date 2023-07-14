import { Alert, AlertTitle } from "@mui/material";
import styles from "./errors.module.css";
import { deleteError } from "../../store/ErrorsStore";

interface IErrorAlertProps {
  error: Error;
}

export default function ErrorAlert(props: IErrorAlertProps) {
  const handleOnClose = () => {
    deleteError(props.error);
  };
  return (
    <Alert
      severity="error"
      className={styles["error-alert"]}
      onClick={() => handleOnClose()}
    >
      <AlertTitle>{props.error.name}</AlertTitle>
      {props.error.message}
    </Alert>
  );
}
