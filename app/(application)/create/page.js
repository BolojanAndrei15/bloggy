"use client";

import { Input } from "@/components/ui/input";
import { FileUp, ImagePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

function CreatePage() {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="font-bold text-2xl">Create post</h1>
        <p className="text-md">
          Welcome to our Create Blogpost Page - Unleash Your Creativity and
          Share Your Voice!
        </p>
      </div>

      <div className="mb-7">
        <div className="flex h-[250px] sm:h-[450px] w-full items-center justify-center rounded-md border border-dashed text-sm cursor-pointer">
          <div className="flex flex-col justify-center items-center text-slate-300 ">
            <ImagePlus strokeWidth={0.75} className="w-20 h-20" />
            <h1 className="font-semibold">Upload Image</h1>
            <p></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="font-semibold">Title of the post</h1>
          <Input placeholder="Example: Exploring the Enchanting Beauty of Kyoto's Cherry Blossoms" />
        </div>

        <div>
          <h1>Description of the post</h1>
          <Input placeholder="Example: mmerse yourself in the breathtaking beauty of ..." />
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between">
          <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
            <h1>Tags for the post</h1>
            <Input placeholder="Example: #beauty, #nature, #life" />
          </div>
          <div className="w-full md:w-[30%] xl:w-[20%] mt-3 md:mt-0">
            <h1>Select category</h1>
            <Select>
              <SelectTrigger className="w-full md:w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <Button variant={"secondary"} className="w-full">
                  Add new category
                </Button>
              </SelectContent>
            </Select>
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
