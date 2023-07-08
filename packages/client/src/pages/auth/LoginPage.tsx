import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import usePageTitle from "../../hooks/usePageTitle";
import styles from "../../components/Auth/auth.module.css";
import AuthForm from "../../components/Auth/AuthForm";
import { SubmitHandler } from "react-hook-form";
import { UserDto, loginUser } from "../../api/user";
import { useState } from "react";
import { setUser } from "../../store/UserStore";
import { ICustomError } from "../../entities/Errors";

export default function LoginPage() {
  usePageTitle("Login");

  const navigate = useNavigate();

  const [error, setError] = useState<ICustomError>();
  const [loading, setLoading] = useState(false);

  const onSunmit: SubmitHandler<UserDto> = async (data: UserDto) => {
    setLoading(true);
    try {
      const responce = await loginUser(data);
      localStorage.setItem("token", responce.data.accessToken);
      setUser(data.name);
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
