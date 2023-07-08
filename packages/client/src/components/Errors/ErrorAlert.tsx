import { Alert, AlertTitle } from "@mui/material";
import { ICustomError } from "../../entities/Errors";

interface IErrorAlertProps {
  error: ICustomError;
}

export default function ErrorAlert(props: IErrorAlertProps) {
  return (
    <Alert
      severity="error"
      sx={{ position: "absolute", top: "10px", right: 0 }}
    >
      <AlertTitle>Error</AlertTitle>
      {props.error.code} {props.error.message}
    </Alert>
  );
}
