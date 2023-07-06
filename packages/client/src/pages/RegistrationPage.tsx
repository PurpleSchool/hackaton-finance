import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import SvgGenerator from "../helpers/SvgGenerator";
import usePageTitle from "../hooks/usePageTitle";
import { Link, redirect, useNavigate } from "react-router-dom";
import styles from "../components/Auth/auth.module.css";
import AuthForm from "../components/Auth/AuthForm";
import { SubmitHandler } from "react-hook-form";
import { IUserAuthData, regUser } from "../api/userApi/user";
import { useState } from "react";
import { ICustomError } from "../entities/Errors";

export default function RegistrationPage() {
  usePageTitle("Registration");

  const navigate = useNavigate();

  const [error, setError] = useState<ICustomError>();
  const [loading, setLoading] = useState(false);

  const onSunmit: SubmitHandler<IUserAuthData> = async (
    data: IUserAuthData
  ) => {
    setLoading(true);
    try {
      const responce = await regUser(data);
    } catch (error) {
      const customError = error as ICustomError;
      setError(customError);
    }
    setLoading(false);
    if (!error) {
      navigate("/login", {
        state: { name: data.name, password: data.password },
      });
    }
  };

  return (
    <div className={["wrapper", styles.authPage].join(" ")}>
      <AuthForm
        type="registration"
        onSubmit={onSunmit}
        loading={loading}
        error={error}
      />
      <Typography>
        Already have an account?
        <Link to={"/login"}>
          <Button variant="text" color="info">
            Log in
          </Button>
        </Link>
      </Typography>
    </div>
  );
}
