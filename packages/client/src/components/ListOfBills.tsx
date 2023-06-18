import { Button } from "@mui/material";
import { useState } from "react";
import BillForm from "./BillForm";
import { useStore } from "effector-react";
import { $billsStore } from "../api/fake/billApi";

import BillListItem from "./BillItem";

export default function ListOfBills() {
  const [showBillForm, setShowBillForm] = useState<boolean>(true);
  const bills = useStore($billsStore);

  return (
    <div
      style={{
        minHeight: "95vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {showBillForm ? (
        <BillForm onClose={setShowBillForm} />
      ) : (
        <Button
          variant="contained"
          sx={{ width: "180px", alignSelf: "center" }}
          onClick={() => setShowBillForm(true)}
        >
          + Add Bill
        </Button>
      )}
      {bills.map((bill) => (
        <BillListItem key={bill.id} {...bill} />
      ))}
    </div>
  );
}
