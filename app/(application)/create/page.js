"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Filter from "bad-words";
import ImageUploader from "@/components/create/ImageUploader";
import Heading from "@/components/create/Heading";
import SelectCategory from "@/components/create/SelectCategory";

export const PostInput = ({ title, placeholder }) => {
  const filter = new Filter({ replaceRegex: /[A-Za-z]/g, replaceWith: "*" });
  const [value, setValue] = useState("");
  if (filter.isProfane(value)) {
    setValue(filter.clean(value));
    console.log(value);
  } else {
    console.log(value);
  }

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">{title}</h1>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

function CreatePage() {
  const [value, setValue] = useState("");
  const { toast } = useToast();

  return (
    <div>
      <Heading />
      <div className="mb-7">
        <ImageUploader />
      </div>
      <div className="flex flex-col space-y-4">
        <PostInput
          title={"Title of the post"}
          placeholder={
            "The Art of Mindfulness: Finding Peace in a Chaotic World"
          }
        />

        <PostInput
          title={"Description of the post"}
          placeholder={
            "In a world filled with constant distractions and ever-increasing demands, finding inner peace ..."
          }
        />

        <div className="flex flex-col md:flex-row w-full items-center justify-between">
          <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
            <PostInput
              title={"Tags of the post"}
              placeholder={"Example: #beauty, #nature, #life"}
            />
          </div>
          <div className=" flex flex-col h-full w-full md:w-[30%] xl:w-[20%] mt-3 md:mt-0 ">
            <SelectCategory />
          </div>
        </div>
        <div className="h-[50rem] sm:h-[47rem] ">
          <h1 className="font-semibold">Post Content</h1>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            style={{ height: "40rem" }}
          />
        </div>
      </div>
      <div className=" flex justify-end">
        <Button className="w-full">Add post</Button>
      </div>
    </div>
  );
}

export default CreatePage;
