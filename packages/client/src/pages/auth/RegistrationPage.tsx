import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ICustomError } from "../../entities/types/Errors";
import { usePageTitle } from "../../shared";
import { User } from "../../../../contracts";
import { userModel } from "../../entities";
import { AuthForm } from "../../features";

export default function RegistrationPage() {
  usePageTitle("Registration");

  const navigate = useNavigate();

  const [error, setError] = useState<ICustomError>();
  const [loading, setLoading] = useState(false);

  const onSunmit: SubmitHandler<User.Request> = async (data: User.Request) => {
    setLoading(true);
    try {
      await userModel.registrationFx(data);
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
