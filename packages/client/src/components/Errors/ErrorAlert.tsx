import { Alert, AlertTitle } from "@mui/material";
import styles from "./errors.module.css";

interface IErrorAlertProps {
  error: Error;
  onClose: React.Dispatch<React.SetStateAction<Error[] | null>>;
  errors: Error[];
}

export default function ErrorAlert(props: IErrorAlertProps) {
  const handleOnClose = () => {
    props.onClose(
      props.errors.filter((err) => err.message !== props.error.message)
    );
  };
  return (
    <Alert
      severity="error"
      className={styles["error-alert"]}
      onClick={() => handleOnClose()}
    >
      <AlertTitle>Error</AlertTitle>
      {props.error.name} {props.error.message}
    </Alert>
  );
}
