import TotalBalanceCard from "./TotalBalanceCard";
import AccountCard from "./AccountCard";
import styles from "./account.module.css";
import AddNewAccountCard from "./AddNewAccountCard";
import {
  $accountsStore,
  $addAccountRegError,
  getAccountsByOwner,
} from "../../store/AccountStore";
import { useStore } from "effector-react";
import {  useState } from "react";
import AddNewAccountModal from "./AddNewAccountModal";
import ErrorAlert from "../Errors/ErrorAlert";

export default function AccountList() {
  const accountsList = useStore($accountsStore);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const errors = useStore($addAccountRegError);
  return (
    <div className={styles.accountList_container}>
      {errors !== null && <ErrorAlert error={errors} />}
      <AddNewAccountModal open={isModalOpen} handleClose={setModalOpen} />
      <TotalBalanceCard />
      {accountsList.map((account) => (
        <AccountCard key={account.id} {...account} />
      ))}
      <AddNewAccountCard setModalOpen={setModalOpen} />
    </div>
  );
}
