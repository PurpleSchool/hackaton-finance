import { Button } from "@mui/material";
import { useState } from "react";
import BillForm from "./BillForm";
import { useStore } from "effector-react";
import { $billStore } from "../api/fake/fakeApi";
import Bill from "./Bill";

export default function ListOfBills() {
  const [formShowed, isFormShowed] = useState<boolean>(true);
  const bills = useStore($billStore);

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {formShowed ? (
        <BillForm onClose={isFormShowed} />
      ) : (
        <Button variant="contained" sx={{width: "180px", alignSelf: 'center'}} onClick={() => isFormShowed(true)}>
          + Add Bill
        </Button>
      )}
      {bills.map((bill) => (
        <Bill key={bill.id} {...bill} />
      ))}
    </div>
  );
}
