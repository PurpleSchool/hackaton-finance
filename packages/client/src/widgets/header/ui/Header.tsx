import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { headerLibs } from "..";
import { useNavigate } from "react-router-dom";
import { userModel } from "../../../entities";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <Typography>Hello, {userModel.useName()}!</Typography>
      <Button onClick={() => headerLibs.logout(navigate)}>
        <LogoutIcon color="error" />
      </Button>
    </header>
  );
}
