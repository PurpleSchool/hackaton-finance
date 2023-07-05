import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import usePageTitle from "../hooks/usePageTitle";
import styles from "../components/Auth/auth.module.css";
import AuthForm from "../components/Auth/AuthForm";
import { SubmitHandler } from "react-hook-form";
import { IUserAuthData, loginUser } from "../api/userApi/user";
import { useState } from "react";
import { setUser } from "../store/UserStore";

export default function LoginPage() {
  usePageTitle("Login");

  interface ICustomError {
    message: string;
    code: number;
  }

  const navigate = useNavigate();

  const [error, setError] = useState<ICustomError>();
  const [loading, setLoading] = useState(false);

  const onSunmit: SubmitHandler<IUserAuthData> = async (
    data: IUserAuthData
  ) => {
    setLoading(true);
    try {
      const responce = await loginUser(data);
      localStorage.setItem("token", responce.data.accessToken);
      setUser({ userName: data.name });
      navigate("/");
    } catch (error) {
      const customError = error as ICustomError;
      setError(customError);
    }
    setLoading(false);
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
