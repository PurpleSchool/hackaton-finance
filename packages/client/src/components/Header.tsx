import { useStore } from "effector-react";
import { $userStore, logoutUser } from "../store/UserStore";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const userName = useStore($userStore);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logoutUser();
    navigate("login");
  };
  return (
    <header className="header">
      <Typography>Hello, {userName}!</Typography>
      <Button onClick={() => handleLogout()}>
        <LogoutIcon color="error"/>
      </Button>
    </header>
  );
}
