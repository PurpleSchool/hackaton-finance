import { useEffect, useState } from "react";
import AccountList from "../components/Account/AccountList";
import { useNavigate } from "react-router-dom";
import { $userStore } from "../store/UserStore";
import { useStore } from "effector-react";
import Header from "../components/Header";
import ErrorAlert from "../components/Errors/ErrorAlert";
import { $errorsStore } from "../store/ErrorsStore";

export default function MainPage() {
  const navigate = useNavigate();
  let userName = useStore($userStore);
  const [errors, setErrors] = useState(useStore($errorsStore));

  useEffect(() => {
    if (
      userName === null ||
      typeof localStorage.getItem("token") !== "string"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="wrapper">
      {errors &&
        errors.map((error) => (
          <ErrorAlert key={error.message} error={error} onClose={setErrors} errors={errors}/>
        ))}
      <Header />
      <AccountList />
    </div>
  );
}
