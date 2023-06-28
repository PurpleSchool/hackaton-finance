import { useStore } from "effector-react";
import TotalBalanceCard from "./TotalBalanceCard";
import { $accountsStore } from "../../api/fake/accountApi";
import AccountCard from "./AccountCard";
import styles from "./account.module.css";
import AddNewAccountCard from "./AddNewAccountCard";

export default function AccountList() {
  const accounts = useStore($accountsStore);

  return (
    <div className={styles.accountList_container}>
      <TotalBalanceCard index={accounts.length}/>
      {accounts.map((account, index) => (
        <AccountCard key={account.id} account={account} index={index}/>
      ))}
      <AddNewAccountCard />
    </div>
  );
}
