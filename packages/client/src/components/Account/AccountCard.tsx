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
import { FindAccount } from "../../../../contracts";

export default function AccountCard(props: FindAccount.Response) {
  const currency = useStore($currencyStore).find(
    (cur) => cur.id === props.currencyId
  );
  const handleDeleteAccount = async () => {
    const res = await deleteAccount(props.id);
  };

  return (
    <Card className={styles.accountCard}>
      <CardActions className={styles["card-actions"]}>
        <Button onClick={() => handleDeleteAccount()}>
          <DeleteIcon color="error" />
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="h5">{currency?.code}</Typography>
      </CardContent>
    </Card>
  );
}
