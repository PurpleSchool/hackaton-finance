import { Card, CardContent, Typography } from "@mui/material";
import { FindBill } from "../../../../contracts";
import { $accountsStore } from "../../store/AccountStore";
import { useStore } from "effector-react";
import { $currencyStore } from "../../store/CurrencyStore";
import dayjs, { Dayjs } from "dayjs";

export default function BillCard(props: FindBill.Response) {
  const accounts = useStore($accountsStore);
  const currencyList = useStore($currencyStore);

  return (
    <Card sx={{ borderRadius: "10px", marginBottom: "5px" }}>
      <CardContent>
        <Typography>ID : {props.id}</Typography>
        <Typography>
          Account : {accounts.find((acc) => acc.id === props.accountId)?.name}
        </Typography>
        <Typography>
          Currency :{" "}
          {currencyList.find((cur) => cur.id === props.currencyId)?.name}
        </Typography>
        <Typography>Type : {props.type}</Typography>
        <Typography>Status : {props.status}</Typography>
        <Typography>Date : {dayjs(props.date).toString()}</Typography>
        <Typography>Created : {dayjs(props.createdAt).toString()}</Typography>
      </CardContent>
    </Card>
  );
}
