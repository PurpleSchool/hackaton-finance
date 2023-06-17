import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { ICategory, addCategory } from "../api/fake/categoryApi";

export default function CreateCategoty() {
  const { register, handleSubmit, reset } = useForm<ICategory>();
  const onSubmit: SubmitHandler<ICategory> = (data) => {
    addCategory({
      name: data.name,
    });
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "40px" }}>
      <TextField type="text" {...register("name")} label="Category Name" />

      <input type="submit" value={"Save Categoty"} />
    </form>
  );
}
