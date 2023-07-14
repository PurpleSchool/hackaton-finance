import { useEffect, useState } from "react";
import AccountList from "../components/Account/AccountList";
import { useNavigate } from "react-router-dom";
import { $userStore } from "../store/UserStore";
import { useStore } from "effector-react";
import Header from "../components/Header";
import ErrorAlert from "../components/Errors/ErrorAlert";
import { $errorsStore } from "../store/ErrorsStore";
import Bills from "../components/Bills/Bills";

export default function MainPage() {
  const navigate = useNavigate();
  let userName = useStore($userStore);
  const errors = useStore($errorsStore);

  useEffect(() => {
    if (
      userName === null ||
      typeof localStorage.getItem("token") !== "string"
    ) {
      navigate("/login");
    }
  }, []);

  console.log();
  return (
    <div className="wrapper">
      {errors &&
        errors.map((error) => <ErrorAlert key={error.message} error={error} />)}
      <Header />
      <AccountList />
      <Bills />
    </div>
  );
}
