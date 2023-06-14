import { Button } from "@mui/material";
import { useState } from "react";
import BillForm from "./BillForm";
import { useStore } from "effector-react";
import { $billsStore } from "../api/fake/billApi";
import BillCard from "./BillCard";

export default function ListOfBills() {
  const [formShowed, isFormShowed] = useState<boolean>(true);
  const bills = useStore($billsStore);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {formShowed ? (
        <BillForm onClose={isFormShowed} />
      ) : (
        <Button
          variant="contained"
          sx={{ width: "180px", alignSelf: "center" }}
          onClick={() => isFormShowed(true)}
        >
          + Add Bill
        </Button>
      )}
      {bills.map((bill) => (
        <BillCard key={bill.id} {...bill} />
      ))}
    </div>
  );
}
