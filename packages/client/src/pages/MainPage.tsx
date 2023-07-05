import { useEffect } from "react";
import AccountList from "../components/Account/AccountList";
import { useNavigate } from "react-router-dom";
import { $userStore } from "../store/UserStore";
import { useStore } from "effector-react";

export default function MainPage() {
  const navigate = useNavigate();
  const userName = useStore($userStore).userName;
  useEffect(() => {
    if (
      userName === null ||
      typeof localStorage.getItem("token") !== "string"
    ) {
      navigate("/login");
      console.log("login");
    }
  }, []);
  return (
    <div className="wrapper">
      <AccountList />
    </div>
  );
}
