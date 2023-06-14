import { SubmitHandler, useForm } from "react-hook-form";
import { $categoryStore, Category, addCategory } from "../api/fake/fakeApi";
import { useStore } from "effector-react";
import { TextField } from "@mui/material";
import CategoryIcon from "./CategoryIcon";
import { useState } from "react";
import MuiIcons from "../helpers/MuiIconList";

export default function CreateCategoty() {
  const categoryes: Category[] = useStore($categoryStore);
  const [isIcon, setIsIcon] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [iconName, setIconName] = useState("");
  const [color, setColor] = useState("");

  const { register, handleSubmit, reset } = useForm<Category>();
  const onSubmit: SubmitHandler<Category> = (data) => {
    addCategory({
      id: categoryes.length + 1,
      name: data.name,
      icon: data.icon,
      color: data.color,
    });

    reset();
  };

  const handleChangeCategoryName = (event: {
    target: { value: string };
  }): void => {
    setCategoryName(event.target.value);
  };
  console.log(categoryName);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}
    >
      <CategoryIcon icon={categoryName} color={color} />

      <TextField
        type="text"
        {...register("name")}
        label="Category Name"
        onChange={handleChangeCategoryName}
      />

      <input type="submit" value={"Save Categoty"} />
    </form>
  );
}
