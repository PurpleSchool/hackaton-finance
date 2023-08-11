import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./account.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { FindAccount } from "../../../../../contracts";
import { accountModel, currencyModel } from "../../../entities";
import { remove } from "..";

type AccountCardProps = {
  account: FindAccount.Response;
};

export function AccountCard(props: AccountCardProps) {
  const isPicked =
    accountModel.usePicked()?.id === props.account.id ? styles.picked : "";
  const currency = currencyModel.useCurrensies().find(
    (cur) => cur.id === props.account.currencyId
  );

  return (
    <Card
      className={[styles.accountCard, isPicked].join(" ")}
      onClick={() => accountModel.setPicked(props.account)}
    >
      <CardActions className={styles["card-actions"]}>
        <Button onClick={() => remove(props.account.id)}>
          <DeleteIcon color="error" />
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6">{props.account.name}</Typography>
        <Typography variant="h6">{currency?.code}</Typography>
      </CardContent>
    </Card>
  );
}
