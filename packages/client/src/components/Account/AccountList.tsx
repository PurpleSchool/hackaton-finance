import TotalBalanceCard from "./TotalBalanceCard";
import AccountCard from "./AccountCard";
import styles from "./account.module.css";
import AddNewAccountCard from "./AddNewAccountCard";
import {
  $accountsStore,
  updateAccountsStoreFx,
} from "../../store/AccountStore";
import { useEvent, useStore } from "effector-react";
import { useState } from "react";
import AddNewAccountModal from "./AddNewAccountModal";

export default function AccountList() {
  const accountsList = useStore($accountsStore);
  const updateAccounts = useEvent(updateAccountsStoreFx);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleCloseModalWithSubmit = () => {
    updateAccounts(null);
    setModalOpen(false);
  };

  return (
    <div className={styles.accountList_container}>
      <AddNewAccountModal
        open={isModalOpen}
        handleClose={setModalOpen}
        accountsList={accountsList}
        handleCloseModalWithSubmit={handleCloseModalWithSubmit}
      />
      {Array.isArray(accountsList) && <TotalBalanceCard />}
      {Array.isArray(accountsList) &&
        accountsList.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      <AddNewAccountCard setModalOpen={setModalOpen} />
    </div>
  );
}
