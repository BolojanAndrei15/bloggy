"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Joi from "joi";
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

const descValidation = Joi.string()
  .min(150)
  .max(400)
  .required()
  .label("Description");

function DescUpload() {
  console.log("Description component");
  const { setDescValidation } = useValidationStore();
  const [input, setInput] = useState({
    desc: "",
    validDesc: false,
  });

  const handleTextChange = useCallback(
    (e) => {
      setInput((prev) => ({ ...prev, desc: e.target.value }));
    },
    [input.desc]
  );

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Description of the post</h1>
      <Input
        value={input.desc}
        onChange={handleTextChange}
        placeholder="In a world filled with constant distractions and ever-increasing demands, finding inner peace has become a cherished pursuit..."
      />
    </div>
  );
}

export default DescUpload;
