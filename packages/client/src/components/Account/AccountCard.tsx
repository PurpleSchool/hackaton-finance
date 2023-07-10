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
  setPickedAccount,
  updateAccountsStoreFx,
} from "../../store/AccountStore";

type AccountCardProps = {
  account: FindAccount.Response;
};

export default function AccountCard(props: AccountCardProps) {
  const updateAccounts = useEvent(updateAccountsStoreFx);
  const currency = useStore($currencyStore).find(
    (cur) => cur.id === props.account.currencyId
  );
  const handleDeleteAccount = async () => {
    const res = await deleteAccount(props.account.id);
    updateAccounts(null);
  };

  return (
    <Card
      className={styles.accountCard}
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
