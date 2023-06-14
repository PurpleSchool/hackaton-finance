import { Card, CardContent, Typography } from "@mui/material";
import CategoryIcon from "./CategoryIcon";
import { $categoryStore, BillProps } from "../api/fake/fakeApi";
import { useStore } from "effector-react";

export default function Bill(props: BillProps) {
  const category = useStore($categoryStore).filter(
    (category) => category.name === props.category
  )[0];
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
        <CategoryIcon icon={category.icon} color={category.color}/>
        <div style={{ marginLeft: "23px" }}>
          <Typography fontSize={16} fontWeight={500}>
            {props.category}
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
          {props.currency}
          {props.totalValue}
        </Typography>
      </CardContent>
    </Card>
  );
}
