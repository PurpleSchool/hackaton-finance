import { Alert, AlertTitle, Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./auth.module.css";
import { IUserAuthData } from "../../api/userApi/user";
import { ICustomError } from "../../entities/Errors";
import SvgGenerator from "../../helpers/SvgGenerator";
import ErrorAlert from "../ErrorAlert";

type AuthFormProps = {
  type: "login" | "registration";
  onSubmit: SubmitHandler<IUserAuthData>;
  loading: boolean;
  error: ICustomError | undefined;
};

export default function AuthForm(props: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  return (
    <>
      <SvgGenerator iconName="logo" width={100} />
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
            required: true,
            maxLength: 128,
            minLength: 1,
          })}
        />
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
            required: true,
            maxLength: 256,
            minLength: 3,
          })}
        />
        <Button className={styles.formItem} type="submit" variant="contained">
          {props.type === "login"
            ? props.loading
              ? "Loading..."
              : "Log in"
            : props.loading
            ? "Loading..."
            : "Sing up"}
        </Button>
        {props.error !== undefined ? <ErrorAlert error={props.error} /> : null}
      </Box>
    </>
  );
}
