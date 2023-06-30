import { Card, CardContent, Typography } from "@mui/material";
import { Account } from "../../api/fake/accountApi";
import styles from "./account.module.css";
import { useStore } from "effector-react";
import { $currencysStore } from "../../api/fake/currencyApi";

type AccountCardProps = {
  account: Account;
  index: number
};

export default function AccountCard(props: AccountCardProps) {
  const currencyList = useStore($currencysStore);

  return (
    <Card
      className={styles.accountCard}
      sx={{ backgroundColor: props.account.cardColor, zIndex:props.index }}
    >
      <CardContent>
        <Typography variant="h6">{props.account.name}</Typography>
        <Typography variant="h5">
          {
            currencyList.find(
              (currency) => currency.id === props.account.currency_id
            )?.sign
          }
          {props.account.balance}
        </Typography>
      </CardContent>
    </Card>
  );
}
