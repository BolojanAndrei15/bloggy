import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import useValidationStore from "@/lib/validation-store";

function EditPostButtons() {
  const { title, desc, tags, category, content, image } = useValidationStore();

  console.log(category);
  return (
    <div className="w-full flex flex-col space-y-3 sm:flex-row  md:justify-end sm:space-x-3 sm:space-y-0">
      <Button variant="destructive" className="w-full md:w-[15rem] ">
        <div className="w-[50%] flex justify-around md:justify-between items-center">
          Delete Post
          <Trash2 />
        </div>
      </Button>
      <Button variant="outline" className="w-full md:w-[15rem]">
        <div className="w-[50%] flex justify-around md:justify-between items-center">
          Save Post
          <Pencil />
        </div>
      </Button>
    </div>
  );
}

export default EditPostButtons;
