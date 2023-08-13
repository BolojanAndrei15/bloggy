"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useValidationStore from "@/lib/validation-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

function SelectCategory({ dataI }) {
  const { setCategoryValid } = useValidationStore();
  const [category, setCategory] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("/api/category");
      return res.data;
    },
  });

  return (
    <>
      <h1 className="font-semibold ">Category of the post</h1>
      <Select onValueChange={setCategoryValid}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder={"No selected Category"} />
        </SelectTrigger>
        <SelectContent>
          {isLoading
            ? "Categories are loading..."
            : data.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectCategory;
