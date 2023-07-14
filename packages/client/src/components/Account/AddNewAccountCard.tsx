import { Card, Typography } from "@mui/material";
import styles from "./account.module.css";

type AddNewAccountModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewAccountCard(props: AddNewAccountModalProps) {
  return (
    <Card
      className={[styles.accountCard, styles.addNew].join(" ")}
      onClick={() => {
        props.setModalOpen(true);
      }}
    >
      <Typography variant="h5"> + Add new</Typography>
    </Card>
  );
}
