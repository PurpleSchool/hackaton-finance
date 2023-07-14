import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AddBilllModal from "./AddBilllModal";
import { useStore } from "effector-react";
import { $AccounsBillsStore, $usersBillsStore } from "../../store/BillStore";
import BillCard from "./BillCard";
import { $pickedAccount } from "../../store/AccountStore";

export default function BillsList() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const billsList =
    useStore($pickedAccount) === null
      ? useStore($usersBillsStore)
      : useStore($AccounsBillsStore);

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
      <Typography sx={{ margin: "5px" }}>Count: {billsList.length}</Typography>
      {Array.isArray(billsList) &&
        billsList.map((bill) => <BillCard key={bill.id} {...bill} />)}
    </div>
  );
}
