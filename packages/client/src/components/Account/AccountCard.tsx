import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./account.module.css";
import { useStore } from "effector-react";
import { $currencyStore } from "../../store/CurrencyStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAccount } from "../../api/account";
import { FindAccount, FindAccountsBy } from "../../../../contracts";

type AccountCardProps = {
  account: FindAccount.Response;
  updateFx: (payload: null) => Promise<FindAccountsBy.Response>;
};

export default function AccountCard(props: AccountCardProps) {
  const currency = useStore($currencyStore).find(
    (cur) => cur.id === props.account.currencyId
  );
  const handleDeleteAccount = async () => {
    const res = await deleteAccount(props.account.id);
    props.updateFx(null);
  };

  return (
    <Card className={styles.accountCard}>
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
