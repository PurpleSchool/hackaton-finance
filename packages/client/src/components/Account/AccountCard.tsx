import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./account.module.css";
import { useEvent, useStore } from "effector-react";
import { $currencyStore } from "../../store/CurrencyStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAccount } from "../../api/account";
import { FindAccount } from "../../../../contracts";
import {
  $accountsStore,
  $pickedAccount,
  setPickedAccount,
  updateAccountsStoreFx,
} from "../../store/AccountStore";
import { $usersBillsStore } from "../../store/BillStore";
import { addError } from "../../store/ErrorsStore";

type AccountCardProps = {
  account: FindAccount.Response;
};

export default function AccountCard(props: AccountCardProps) {
  const updateAccounts = useEvent(updateAccountsStoreFx);
  const currency = useStore($currencyStore).find(
    (cur) => cur.id === props.account.currencyId
  );
  const billsList = useStore($usersBillsStore);
  const handleDeleteAccount = async () => {
    if (
      billsList.find((bill) => bill.accountId === props.account.id) ===
      undefined
    ) {
      await deleteAccount(props.account.id);
      updateAccounts(null);
    } else {
      const error = new Error();
      error.message = "You cant delete this account beacuse it have bills";
      error.name = "Delete account error";
      addError(error);
      console.log(error.message);
    }
  };
  const isPicked =
    useStore($pickedAccount)?.id === props.account.id ? styles.picked : "";

  return (
    <Card
      className={[styles.accountCard, isPicked].join(" ")}
      onClick={() => setPickedAccount(props.account)}
    >
      <CardActions className={styles["card-actions"]}>
        <Button onClick={() => handleDeleteAccount()}>
          <DeleteIcon color="error" />
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6">{props.account.name}</Typography>
        <Typography variant="h5">{currency?.code}</Typography>
      </CardContent>
    </Card>
  );
}
