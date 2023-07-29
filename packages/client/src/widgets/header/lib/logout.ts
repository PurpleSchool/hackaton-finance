import { NavigateFunction } from "react-router-dom";
import { userModel } from "../../../entities";

export const logout = (navigate: NavigateFunction) => {
  localStorage.clear();
  userModel.logout();
  navigate("login");
};
