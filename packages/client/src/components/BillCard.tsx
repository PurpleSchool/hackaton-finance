import { Card, CardContent, Typography } from "@mui/material";
import { useStore } from "effector-react";
import { BillType } from "../api/fake/billApi";
import { $categorysStore } from "../api/fake/categoryApi";
import { $transactionsStore } from "../api/fake/transactionsApi";
import { $currencysStore } from "../api/fake/currencyApi";

export default function BillCard(props: BillType) {
  const categoryes = useStore($categorysStore);
  const transactions = useStore($transactionsStore);
  const currencyes = useStore($currencysStore);

  const category = categoryes.filter(
    (category) =>
      category.id ===
      transactions
        .filter((transaction) => transaction.bill_id === props.id)
        .sort((a, b) => b.value - a.value)[0].category_id
  )[0].name;

  const totalValue = transactions
    .filter((transaction) => transaction.bill_id === props.id)
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const currency = currencyes.filter(
    (currency) => currency.id === props.currency_id
  )[0].sign;

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
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
            sx={{ color: () => (props.status ? "var(--green)" : "var(--red)") }}
          >
            Transaction {props.status ? "Successful" : "Failed"}
          </Typography>
        </div>
        <Typography
          fontSize={24}
          sx={{
            color: () => (props.type ? "var(--green)" : "var(--red)"),
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          {props.type ? "" : "-"}
          {currency}
          {totalValue}
        </Typography>
      </CardContent>
    </Card>
  );
}
