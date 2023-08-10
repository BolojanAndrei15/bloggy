import React, { useEffect, useState } from "react";
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
  const { setDescValidation } = useValidationStore();

  const [input, setInput] = useState({
    desc: "",
    validDesc: false,
  });
  useEffect(() => {
    setInput({ desc: "", validDesc: false });
  }, []);

  useEffect(() => {
    const validate = descValidation.validate(input.desc);
    const { error } = validate;

    if (input.desc !== "") {
      if (error) {
        setDescValidation("");
        setInput({ ...input, validDesc: error.details[0].message });
      } else {
        setInput({ ...input, validDesc: true });
        setDescValidation(input.desc);
      }
    }
  }, [input.desc]);

  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">Description of the post</h1>
      <Input
        onChange={(e) => setInput({ ...input, desc: e.target.value })}
        className={`${
          input.desc !== ""
            ? input.validDesc !== true
              ? "border-red-500"
              : "border-green-500"
            : ""
        }`}
        placeholder="In a world filled with constant distractions and ever-increasing demands, finding inner peace has become a cherished pursuit..."
      />
      {input.validDesc !== false && input.desc !== "" ? (
        <Label className="text-sm text-red-500">{input.validDesc}</Label>
      ) : (
        ""
      )}
    </div>
  );
}

export default DescUpload;
