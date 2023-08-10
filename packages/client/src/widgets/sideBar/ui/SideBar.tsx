import { Box } from "@mui/material";
import { AccountList, TotalBalanceCard } from "../../../features";

export function SideBar() {
  return (
    <Box component={"div"} className="aside">
      <TotalBalanceCard />
      <AccountList />
    </Box>
  );
}
