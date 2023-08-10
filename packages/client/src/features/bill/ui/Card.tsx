import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FindBill } from "../../../../../contracts";
import { accountModel, currencyModel } from "../../../entities";

export function BillCard(props: FindBill.Response) {
  return (
    <Card sx={{ borderRadius: "10px", marginBottom: "5px" }}>
      <CardContent>
        <Typography>ID : {props.id}</Typography>
        <Typography>
          Account :
          {
            accountModel.useAccounts().find((acc) => acc.id === props.accountId)
              ?.name
          }
        </Typography>
        <Typography>
          Currency :
          {
            currencyModel
              .useCurrensies()
              .find((cur) => cur.id === props.currencyId)?.name
          }
        </Typography>
        <Typography>Type : {props.type}</Typography>
        <Typography>Status : {props.status}</Typography>
        <Typography>Date : {dayjs(props.date).toString()}</Typography>
        <Typography>Created : {dayjs(props.createdAt).toString()}</Typography>
      </CardContent>
    </Card>
  );
}
