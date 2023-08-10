"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

function TitleUpload() {
  const titleValidation = Joi.string()
    .min(50)
    .max(250)
    .required()
    .label("Title");

  const { setTitleValidation } = useValidationStore();
  console.log("Title component");

  const [input, setInput] = useState({
    title: "",
    validTitle: false,
  });

  const handleTextChange = useCallback(
    (e) => {
      setInput((prev) => ({ ...prev, title: e.target.value }));
    },
    [input.title]
  );

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Title of the post</h1>
      <Input
        value={input.title}
        onChange={handleTextChange}
        placeholder="The Art of Mindfulness: Finding Peace in a Chaotic World..."
      />
    </div>
  );
}

export default TitleUpload;
