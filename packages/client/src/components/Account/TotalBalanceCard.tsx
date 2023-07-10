import { Card, CardContent, Typography } from "@mui/material";
import styles from "./account.module.css";
import { resetPickedAccount } from "../../store/AccountStore";
import { useEvent } from "effector-react";

export default function TotalBalanceCard() {
  const reset = useEvent(resetPickedAccount);
  return (
    <Card
      className={[styles.accountCard, styles.totalBalanceCard].join(" ")}
      onClick={() => reset()}
    >
      <CardContent className={styles.cardCoontent_container}>
        <Typography variant="h6">Current Balance</Typography>
      </CardContent>
    </Card>
  );
}
