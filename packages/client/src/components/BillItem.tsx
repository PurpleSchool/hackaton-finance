import { useState } from "react";
import { IBillWithId } from "../api/fake/billApi";
import BillForm from "./BillForm";
import BillCard from "./BillCard";

export default function BillListItem(props: IBillWithId) {
  const [showBillForm, setShowBillForm] = useState<boolean>(false);

  return (
    <>
      {showBillForm ? (
        <BillForm onClose={setShowBillForm} bill={props} />
      ) : (
        <BillCard bill={props} setShowBillForm={setShowBillForm} />
      )}
    </>
  );
}
