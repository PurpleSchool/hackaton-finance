import { AccountCard } from "./Card";
import styles from "./account.module.css";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { accountModel } from "../../../entities";
import { AddNewAccountModal } from "./AddNewAccountModal";

export function AccountList() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleCloseModalWithSubmit = () => {
    accountModel.updateAccountsFx(null);
    setModalOpen(false);
  };

  return (
    <div className={styles.accountList_container}>
      <Box component={"div"} className={styles["accountList-title"]}>
        <Typography sx={{ display: "inline-block" }}>Accounts</Typography>
        <Button variant="text" onClick={() => setModalOpen(true)}>
          Add account
        </Button>
      </Box>
      <hr
        style={{
          border: "solid 1px var(--gray)",
          marginBottom: "20px",
          width: "90%",
        }}
      />
      <AddNewAccountModal
        open={isModalOpen}
        handleClose={setModalOpen}
        accountsList={accountModel.useAccounts()}
        handleCloseModalWithSubmit={handleCloseModalWithSubmit}
      />

      {Array.isArray(accountModel.useAccounts()) &&
        accountModel.useAccounts().map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
    </div>
  );
}
