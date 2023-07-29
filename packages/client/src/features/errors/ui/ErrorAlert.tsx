import { Alert, AlertTitle } from "@mui/material";
import styles from "./errors.module.css";

export function ErrorAlert(props: Error) {
  const handleOnClose = () => {
    //FIX ME: add errors remover
  };

  return (
    <Alert
      severity="error"
      className={styles["error-alert"]}
      onClick={() => handleOnClose()}
    >
      <AlertTitle>{props.name}</AlertTitle>
      {props.message}
    </Alert>
  );
}
