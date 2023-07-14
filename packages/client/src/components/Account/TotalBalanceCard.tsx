import { Card, CardContent, Typography } from "@mui/material";
import styles from "./account.module.css";
import { $pickedAccount, resetPickedAccount } from "../../store/AccountStore";
import { useEvent, useStore } from "effector-react";

export default function TotalBalanceCard() {
  const reset = useEvent(resetPickedAccount);
  const isPicked = useStore($pickedAccount) === null ? styles.picked : "";

  return (
    <Card
      className={[styles.accountCard, styles.totalBalanceCard, isPicked].join(
        " "
      )}
      onClick={() => reset()}
    >
      <CardContent className={styles.cardCoontent_container}>
        <Typography variant="h6">Current Balance</Typography>
      </CardContent>
    </Card>
  );
}
