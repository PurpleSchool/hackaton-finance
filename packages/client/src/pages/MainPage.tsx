import { useEffect } from "react";
import AccountList from "../components/Account/AccountList";
import { useNavigate } from "react-router-dom";
import { $userStore } from "../store/UserStore";
import { useStore } from "effector-react";
import Header from "../components/Header";

export default function MainPage() {
  const navigate = useNavigate();
  let userName = useStore($userStore);

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
      <Header />
      <AccountList />
    </div>
  );
}
