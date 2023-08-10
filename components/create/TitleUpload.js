import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";
const titleValidation = Joi.string().min(80).max(250).required().label("Title");

function TitleUpload() {
  const { setTitleValidation } = useValidationStore();

  const [input, setInput] = useState({
    title: "",
    validTitle: false,
  });

  useEffect(() => {
    const validate = titleValidation.validate(input.title);
    const { error } = validate;

    if (input.title !== "") {
      if (error) {
        setTitleValidation("");
        setInput({ ...input, validTitle: error.details[0].message });
      } else {
        setInput({ ...input, validTitle: true });
        setTitleValidation(input.title);
      }
    }
  }, [input.title]);

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Title of the post</h1>
      <Input
        onChange={(e) => setInput({ ...input, title: e.target.value })}
        className={`${
          input.title !== ""
            ? input.validTitle !== true
              ? "border-red-500"
              : "border-green-500"
            : ""
        }`}
        placeholder="The Art of Mindfulness: Finding Peace in a Chaotic World"
      />
      {input.validTitle !== false && input.title !== "" ? (
        <Label className="text-sm text-red-500">{input.validTitle}</Label>
      ) : (
        ""
      )}
    </div>
  );
}

export default TitleUpload;
