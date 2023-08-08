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
import { PostInput } from "@/app/(application)/create/page";
import axios from "axios";

function SelectCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/category");
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
                <SelectItem key={category.id} value={category.name}>
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
              <PostInput
                title={"Name of the new category"}
                placeholder={"Example: Tech ..."}
              />
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
