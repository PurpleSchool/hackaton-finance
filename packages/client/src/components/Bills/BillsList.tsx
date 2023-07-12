import { Button } from "@mui/material";
import { useState } from "react";
import AddBilllModal from "./AddBilllModal";

export default function BillsList() {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);
  return (
    <div>
      <AddBilllModal open={isModalOpen} handleClose={setModalOpen} />
      <Button
        variant="contained"
        sx={{ marginTop: "30px" }}
        onClick={() => setModalOpen(true)}
      >
        + Add Bill
      </Button>
    </div>
  );
}
