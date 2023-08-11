import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./auth.module.css";
import { ICustomError } from "../../../entities/types/Errors";
import { useLocation } from "react-router-dom";
import { ICustomLocationWithState } from "../../../entities";
import { Logo } from "../../../shared";
import { FormValidationError } from "../../form";
import { User } from "../../../../../contracts";

type AuthFormProps = {
  type: "login" | "registration";
  onSubmit: SubmitHandler<User.Request>;
  loading: boolean;
  error: ICustomError | undefined;
};

export function AuthForm(props: AuthFormProps) {
  const location = useLocation() as ICustomLocationWithState;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User.Request>({
    mode: "onBlur",
    defaultValues: {
      name: location.state?.name || "",
      password: location.state?.password || "",
    },
  });

  return (
    <>
      <Logo width={100} />
      <Box
        component={"form"}
        className={[styles.form_container].join(" ")}
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <TextField
          className={styles.formItem}
          id="username"
          label="Name"
          autoComplete="username"
          variant="outlined"
          {...register("name", {
            required: "This field is required",
            maxLength: { value: 128, message: "Maximum 128 characters" },
            minLength: { value: 1, message: "Minimum 1 character required" },
          })}
        />
        <FormValidationError error={errors.name} />
        <TextField
          className={styles.formItem}
          id="password"
          label="Password"
          type="password"
          autoComplete={
            props.type === "login" ? "current-password" : "new-password"
          }
          variant="outlined"
          {...register("password", {
            required: "This field is required",
            maxLength: { value: 256, message: "Maximum 256 characters" },
            minLength: { value: 3, message: "Minimum 3 character required" },
          })}
        />
        <FormValidationError error={errors.password} />
        <Button
          className={styles.formItem}
          type="submit"
          variant="contained"
          disabled={!isValid}
        >
          {props.type === "login"
            ? props.loading
              ? "Loading..."
              : "Log in"
            : props.loading
            ? "Loading..."
            : "Sing up"}
        </Button>
      </Box>
    </>
  );
}