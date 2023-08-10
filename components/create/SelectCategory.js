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

function SelectCategory() {
  const { setCategoryValid } = useValidationStore();
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/category");
      return res.data;
    },
  });

  return (
    <>
      <h1 className="font-semibold ">Category of the post</h1>
      <Select onValueChange={setCategoryValid}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="No selected value" />
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
