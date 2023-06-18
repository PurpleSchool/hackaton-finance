import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, TextField } from "@mui/material";
import { ICategory, addCategory } from "../api/fake/categoryApi";
import { Dispatch, SetStateAction } from "react";

type CreateCategoryProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid var(--blue)",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function CreateCategoty(props: CreateCategoryProps) {
  const { register, handleSubmit, reset } = useForm<ICategory>();
  const onSubmit: SubmitHandler<ICategory> = (data) => {
    addCategory({
      name: data.name,
    });
    reset();
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      sx={{
        ...style,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          height: "100%",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        <TextField
          type="text"
          {...register("name")}
          label="Category Name"
          defaultValue={props.name}
        />

        <input type="submit" value={"Save Categoty"} />
      </form>
    </Modal>
  );
}
