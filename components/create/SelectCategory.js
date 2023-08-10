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
      <Select>
        <SelectTrigger className="w-full ">
          <SelectValue value={false} placeholder="No selected value" />
        </SelectTrigger>
        <SelectContent>
          {isLoading
            ? "Categories are loading..."
            : data.map((category) => (
                <SelectItem
                  onClick={() => setCategoryValid(category.id)}
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectCategory;
