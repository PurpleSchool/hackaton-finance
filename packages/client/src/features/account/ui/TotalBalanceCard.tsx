import { Card, CardContent, Typography } from "@mui/material";
import styles from "./account.module.css";
import { accountModel } from "../../../entities";

export function TotalBalanceCard() {
  const isPicked = accountModel.usePicked() === null ? styles.picked : "";

  return (
    <Card
      className={[styles.accountCard, styles.totalBalanceCard, isPicked].join(
        " "
      )}
      onClick={() => accountModel.resetPicked()}
    >
      <CardContent className={styles.cardCoontent_container}>
        <Typography variant="h6">Current Balance</Typography>
      </CardContent>
    </Card>
  );
}
