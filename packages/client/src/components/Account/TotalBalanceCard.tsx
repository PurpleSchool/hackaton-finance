import { Card, CardContent, Typography } from "@mui/material";
import styles from "./account.module.css";

export default function TotalBalanceCard() {
  return (
    <Card className={[styles.accountCard, styles.totalBalanceCard].join(" ")}>
      <CardContent className={styles.cardCoontent_container}>
        <Typography variant="h6">Current Balance</Typography>
      </CardContent>
    </Card>
  );
}
