import { Card, Typography } from '@mui/material';
import styles from "./account.module.css";

export default function AddNewAccountCard() {
  return (
    <Card className={[styles.accountCard, styles.addNew].join(" ")}>
       <Typography variant='h5'> + Add new</Typography>
    </Card>
  );
}
