import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ICustomError } from "../../entities/types/Errors";
import { usePageTitle } from "../../shared";
import { User } from "../../../../contracts";
import { userModel } from "../../entities";
import { AuthForm } from "../../features";
import styles from './auth.module.css'

export default function LoginPage() {
  usePageTitle("Login");

  const navigate = useNavigate();

  const [error, setError] = useState<ICustomError>();
  const [loading, setLoading] = useState(false);

  const onSunmit: SubmitHandler<User.Request> = async (data: User.Request) => {
    setLoading(true);
    try {
      await userModel.loginFx(data);
    } catch (error) {
      const customError = error as ICustomError;
      setError(customError);
    }
    setLoading(false);
    if (!error) {
      navigate("/");
    }
  };
  return (
    <div className={["wrapper", styles.authPage].join(" ")}>
      <AuthForm
        type="login"
        onSubmit={onSunmit}
        loading={loading}
        error={error}
      />
      <Typography>
        Don’t have an account yet?
        <Link to={"/registration"}>
          <Button variant="text" color="info">
            Sing up
          </Button>
        </Link>
      </Typography>
    </div>
  );
}
