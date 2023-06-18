import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useStore } from "effector-react";
import { IBillWithId, removeBill } from "../api/fake/billApi";
import { $categorysStore } from "../api/fake/categoryApi";
import { $transactionsStore } from "../api/fake/transactionsApi";
import { $currencysStore } from "../api/fake/currencyApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

type BillCardProps = {
  bill: IBillWithId;
  setShowBillForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BillCard(props: BillCardProps) {
  const categoryes = useStore($categorysStore);
  const transactions = useStore($transactionsStore);
  const currencyes = useStore($currencysStore);

  const [showActions, setShowActions] = useState<"none" | "flex">("none");

  const category = categoryes.filter(
    (category) =>
      category.id ===
      transactions
        .filter((transaction) => transaction.bill_id === props.bill.id)
        .sort((a, b) => b.value - a.value)[0].category_id
  )[0].name;

  const totalValue = transactions
    .filter((transaction) => transaction.bill_id === props.bill.id)
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const currency = currencyes.filter(
    (currency) => currency.id === props.bill.currency_id
  )[0].sign;

  const handleDeleteBill = () => {
    removeBill(props.bill.id);
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseOver={() => setShowActions("flex")}
      onMouseLeave={() => setShowActions("none")}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "23px" }}>
          <Typography fontSize={16} fontWeight={500}>
            {category}
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={400}
            sx={{
              color: () => (props.bill.status ? "var(--green)" : "var(--red)"),
            }}
          >
            Transaction {props.bill.status ? "Successful" : "Failed"}
          </Typography>
        </div>
        <Typography
          fontSize={24}
          sx={{
            color: () => (props.bill.type ? "var(--green)" : "var(--red)"),
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          {props.bill.type ? "" : "-"}
          {currency}
          {totalValue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: showActions }}>
        <Button onClick={() => props.setShowBillForm(true)}>
          <EditIcon />
        </Button>
        <Button onClick={handleDeleteBill}>
          <DeleteIcon color="error" />
        </Button>
      </CardActions>
    </Card>
  );
}
