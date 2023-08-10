"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import Filter from "bad-words";

import ImageUploader from "@/components/create/ImageUploader";
import Heading from "@/components/create/Heading";
import SelectCategory from "@/components/create/SelectCategory";
import Joi from "joi";
import { Label } from "@/components/ui/label";
import TagUpload from "@/components/create/TagUpload";
import TitleUpload from "@/components/create/TitleUpload";
import DescUpload from "@/components/create/DescUpload";

const titleValidation = Joi.string().min(80).max(250).required().label("Title");
const descriptionValidation = Joi.string()
  .min(150)
  .max(300)
  .required()
  .label("Title");

function CreatePage() {
  const [value, setValue] = useState("");

  const { toast } = useToast();
  const [input, setInput] = useState({
    title: "",
    validTitle: false,
    description: "",
    validDescription: "",
  });
  useEffect(() => {
    setInput({
      ...input,
      validTitle: false,
      validDescription: false,
      validTags: false,
    });
  }, []);
  useEffect(() => {
    const validate = titleValidation.validate(input.title);
    const { error } = validate;

    if (input.title !== "") {
      if (error) {
        setInput({ ...input, validTitle: error.details[0].message });
      } else {
        setInput({ ...input, validTitle: true });
      }
    }
  }, [input.title]);

  useEffect(() => {
    const validate = descriptionValidation.validate(input.description);
    const { error } = validate;

    if (input.description !== "") {
      if (error) {
        setInput({ ...input, validDescription: error.details[0].message });
      } else {
        setInput({ ...input, validDescription: true });
      }
    }
  }, [input.description]);

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
        <Button className="w-full">Add post</Button>
      </div>
    </div>
  );
}

export default CreatePage;
