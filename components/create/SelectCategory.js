import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BookmarkPlus } from "lucide-react";

import axios from "axios";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

const categoryValidation = Joi.string()
  .min(5)
  .max(15)
  .required()
  .label("Category");

function SelectCategory() {
  const { setSelectedCategory } = useValidationStore();

  const [selectedCategory, setCategory] = useState("");
  const [input, setInput] = useState({
    category: "",
    validCategory: false,
  });

  useEffect(() => {
    if (selectedCategory !== "") {
      setSelectedCategory(selectedCategory);
    } else {
      setSelectedCategory("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    setInput({ category: "", validCategory: false });
  }, []);

  useEffect(() => {
    const validate = categoryValidation.validate(input.category);
    const { error } = validate;

    if (input.category !== "") {
      if (error) {
        setInput({ ...input, validCategory: error.details[0].message });
      } else {
        setInput({ ...input, validCategory: true });
      }
    }
  }, [input.title]);

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("/api/category");
      return res.data;
    },
  });
  return (
    <>
      <h1 className="font-medium mb-1">Select</h1>
      <Select>
        <SelectTrigger className="w-full md:w-full">
          <SelectValue value="none" placeholder="Choose one category" />
        </SelectTrigger>
        <SelectContent>
          {isLoading
            ? ""
            : data.map((category) => (
                <SelectItem
                  onClick={(e) => setCategory(category.id)}
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              ))}

          <Dialog>
            <DialogTrigger className="w-full mt-2 p-2">
              {" "}
              <Button className="w-full flex justify-between">
                Add new category
                <BookmarkPlus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Discover and Define: Create Your Category
                </DialogTitle>
                <DialogDescription>
                  The Art of Categorization: Sculpt Your Own Realm of
                  Imagination!
                </DialogDescription>
              </DialogHeader>
              <h1 className="font-medium">Add new category</h1>
              <Input
                value={input.category}
                onChange={(e) =>
                  setInput({ ...input, category: e.target.value })
                }
                className={`${
                  input.category !== ""
                    ? input.validCategory !== true
                      ? "border-red-500"
                      : "border-green-500"
                    : ""
                }`}
                placeholder="Example: School or Tech or ..."
              />
              {input.validCategory !== false && input.category !== "" ? (
                <Label className="text-sm text-red-500">
                  {input.validCategory}
                </Label>
              ) : (
                ""
              )}
              <div className="flex w-full md:justify-end">
                <Button className="w-full md:w-48 flex justify-between">
                  Add new Category
                  <BookmarkPlus />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectCategory;
