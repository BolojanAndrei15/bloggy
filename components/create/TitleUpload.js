"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

function TitleUpload({ data }) {
  const { setTitleValidation } = useValidationStore();
  const titleValidation = Joi.string()
    .min(50)
    .max(250)
    .trim()
    .required()
    .label("Title");

  const [input, setInput] = useState({
    title: "",
    validTitle: false,
  });

  useEffect(() => {
    setTitleValidation("");
    if (data) {
      setInput({
        title: data,
        validTitle: true,
      });
      setTitleValidation(data);
    }
  }, []);

  const handleTextChange = useCallback(
    (e) => {
      setInput((prev) => ({ ...prev, title: e.target.value }));
    },
    [input.title]
  );

  const validateInput = useCallback(
    (e) => {
      const { error } = titleValidation.validate(e.target.value);
      if (error) {
        setInput((prev) => ({ ...prev, validTitle: error.details[0].message }));
        setTitleValidation("");
      } else {
        setInput((prev) => ({ ...prev, validTitle: true }));
        setTitleValidation(e.target.value);
      }
    },
    [input.title]
  );

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Title of the post</h1>
      <Input
        className={`${
          input.title !== ""
            ? input.validTitle !== true
              ? "border-red-500"
              : "border-green-500"
            : ""
        }`}
        value={input.title}
        onChange={(e) => {
          handleTextChange(e);
          validateInput(e);
        }}
        placeholder="The Art of Mindfulness: Finding Peace in a Chaotic World..."
      />
      {input.validTitle !== false && input.title !== "" ? (
        <Label className="text-sm font-medium text-red-500">
          {input.validTitle}
        </Label>
      ) : (
        ""
      )}
    </div>
  );
}

export default TitleUpload;
