"use client";

import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import ImageUploader from "@/components/create/ImageUploader";
import Heading from "@/components/create/Heading";
import SelectCategory from "@/components/create/SelectCategory";

import { Label } from "@/components/ui/label";
import TagUpload from "@/components/create/TagUpload";
import TitleUpload from "@/components/create/TitleUpload";
import DescUpload from "@/components/create/DescUpload";
import axios from "axios";

import useValidationStore from "@/lib/validation-store";
import { useSession } from "next-auth/react";

function CreatePage() {
  const { data: session } = useSession();
  const { imageValid, selectedCategory, tagsValid, titleValid, descValid } =
    useValidationStore();

  const [value, setValue] = useState("");
  const { toast } = useToast();

  return (
    <div>
      <Heading />
      <div className="mb-7">
        <ImageUploader />
      </div>
      <div className="flex flex-col space-y-4">
        <TitleUpload />
        <div className="flex flex-col space-y-1">
          <DescUpload />
        </div>

        <div className="flex flex-col md:flex-row w-full items-center justify-between">
          <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
            <TagUpload />
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
        <Button
          onClick={() => {
            axios
              .post("http://localhost:3000/api/blogpost", {
                title: titleValid,
                description: descValid,
                categoryId: "b3a6e408-953c-4bb1-992b-ea2a87d82af4",
                tags: tagsValid,
                image:
                  "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                authorId: session.user.id,
                authorName: session.user.name,
                content: value,
              })
              .then(() => {
                console.log("it worked");
              })
              .catch((err) => console.log(err));
          }}
          className="w-full"
        >
          Add post
        </Button>
      </div>
    </div>
  );
}

export default CreatePage;
