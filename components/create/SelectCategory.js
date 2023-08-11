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
import { useEffect } from "react";

function SelectCategory({ dataI }) {
  const { setCategoryValid } = useValidationStore();
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/category");
      return res.data;
    },
  });

  const handleCateogry = (dataI) => {
    if (!isLoading) {
      const res = data.filter((category) => {
        return category.id == dataI;
      });
      return res[0].name;
    }
  };

  useEffect(() => {
    if (isLoading) {
      setCategoryValid("Loading data....");
    } else {
      if (dataI) {
        const category = handleCateogry(dataI);
        setCategoryValid(category);
      }
    }
  }, [isLoading]);

  return (
    <>
      <h1 className="font-semibold ">Category of the post</h1>
      <Select onValueChange={setCategoryValid}>
        <SelectTrigger className="w-full ">
          <SelectValue
            value={dataI}
            placeholder={dataI ? handleCateogry(dataI) : "No selected Category"}
          />
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
