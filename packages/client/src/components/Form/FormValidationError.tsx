import { Alert } from "@mui/material";
import { FieldError } from "react-hook-form";

interface IFormValidationErrorProps {
  error?: FieldError;
}

export default function FormValidationError(props: IFormValidationErrorProps) {
  return (
    <div style={{ height: "60px", paddingBottom: "10px", width: "100%" }}>
      {props.error && (
        <Alert variant="filled" severity="warning" sx={{ width: "100%" }}>
          {props.error.message}
        </Alert>
      )}
    </div>
  );
}
