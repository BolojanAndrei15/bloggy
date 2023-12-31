"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

const descValidation = Joi.string()
  .min(100)
  .max(400)
  .required()
  .trim()
  .label("Description");

function DescUpload({ data }) {
  const { setDescValidation } = useValidationStore();
  const [input, setInput] = useState({
    desc: "",
    validDesc: false,
  });

  useEffect(() => {
    setDescValidation("");

    if (data) {
      setInput({
        desc: data,
        validDesc: true,
      });
      setDescValidation(data);
    }
  }, []);

  const handleTextChange = useCallback(
    (e) => {
      setInput((prev) => ({ ...prev, desc: e.target.value }));
    },
    [input.desc]
  );

  const validateInput = useCallback(
    (e) => {
      const { error } = descValidation.validate(e.target.value);
      if (error) {
        setDescValidation("");
        setInput((prev) => ({ ...prev, validDesc: error.details[0].message }));
      } else {
        setInput((prev) => ({ ...prev, validDesc: true }));
        setDescValidation(e.target.value);
      }
    },
    [input.desc]
  );

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Description of the post</h1>
      <Input
        className={`${
          input.desc !== ""
            ? input.validDesc !== true
              ? "border-red-500"
              : "border-green-500"
            : ""
        }`}
        value={input.desc}
        onChange={(e) => {
          handleTextChange(e);
          validateInput(e);
        }}
        placeholder="In a world filled with constant distractions and ever-increasing demands, finding inner peace has become a cherished pursuit..."
      />

      {input.validDesc !== false && input.desc !== "" ? (
        <Label className="text-sm font-medium text-red-500">
          {input.validDesc}
        </Label>
      ) : (
        ""
      )}
    </div>
  );
}

export default DescUpload;
