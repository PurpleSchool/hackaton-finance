import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddBilllModal } from "../index";
import { accountModel, billModel } from "../../../entities";
import { BillCard } from "..";

export function BillsList() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const bills =
    accountModel.usePicked() === null ? billModel.useUsersBills() : billModel.useAccBills();

  return (
    <div className="_container">
      <AddBilllModal open={isModalOpen} handleClose={setModalOpen} />
      <Button
        variant="contained"
        sx={{ marginTop: "30px", alignSelf: "center" }}
        onClick={() => setModalOpen(true)}
      >
        + Add Bill
      </Button>
      <Typography sx={{ margin: "5px" }}>Count: {bills.length}</Typography>
      {Array.isArray(bills) &&
        bills.map((bill) => <BillCard key={bill.id} {...bill} />)}
    </div>
  );
}
