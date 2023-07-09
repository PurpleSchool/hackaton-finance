import TotalBalanceCard from "./TotalBalanceCard";
import AccountCard from "./AccountCard";
import styles from "./account.module.css";
import AddNewAccountCard from "./AddNewAccountCard";
import {
  $accountsStore,
  updateAccountsStoreFx,
} from "../../store/AccountStore";
import { useEvent, useStore } from "effector-react";
import { useEffect, useState } from "react";
import AddNewAccountModal from "./AddNewAccountModal";

export default function AccountList() {
  const updateAccounts = useEvent(updateAccountsStoreFx);
  const accountsList = useStore($accountsStore);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    updateAccounts(null);
  }, [isModalOpen]);

  return (
    <div className={styles.accountList_container}>
      <AddNewAccountModal open={isModalOpen} handleClose={setModalOpen} />
      <TotalBalanceCard />
      {Array.isArray(accountsList) &&
        accountsList.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            updateFx={updateAccounts}
          />
        ))}
      <AddNewAccountCard setModalOpen={setModalOpen} />
    </div>
  );
}
