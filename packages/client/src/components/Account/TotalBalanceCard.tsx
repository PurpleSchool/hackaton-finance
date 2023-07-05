import { useStore } from "effector-react";
import { $accountsStore } from "../../api/fake/accountApi";
import { $currencysStore } from "../../api/fake/currencyApi";
import { Card, CardContent, Typography } from "@mui/material";
import styles from "./account.module.css";

type TotalBalanceProps = {
  index: number;
};

export default function TotalBalanceCard(proops: TotalBalanceProps) {
  const accounts = useStore($accountsStore);

  const BalanceListByCurrency = useStore($currencysStore).map((currency) => {
    return {
      ...currency,
      balance: accounts
        .filter((acc) => acc.currency_id === currency.id)
        .reduce((total, acc) => total + acc.balance, 0),
    };
  });
  return (
    <Card
      className={[styles.accountCard, styles.totalBalanceCard].join(" ")}
      sx={{ zIndex: proops.index }}
    >
      <CardContent className={styles.cardCoontent_container}>
        <Typography variant="h6">Current Balance</Typography>
        {BalanceListByCurrency.filter((item) => item.balance !== 0).map(
          (item) => (
            <Typography key={item.id} variant="h5">
              {item.sign}
              {item.balance}
            </Typography>
          )
        )}
      </CardContent>
    </Card>
  );
}
