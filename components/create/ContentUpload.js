"use client";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import Joi from "joi"; // Import Joi
import { Label } from "../ui/label";
import useValidationStore from "@/lib/validation-store";

const schema = Joi.string().trim().required().min(300).label("Content"); // Define validation schema

function ContentUpload({ data }) {
  const { setContentValidation } = useValidationStore();
  const [value, setValue] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (data) {
      setValue(data);
      setContentValidation(data);
    }
  }, []);

  const handleEditorChange = (content) => {
    setValue(content);

    const { error } = schema.validate(content);
    if (error) {
      setValidationError(error.details[0].message);
    } else {
      setContentValidation(content);
      setValidationError("");
    }
  };

  return (
    <div className="h-[50rem] sm:h-[47rem] mt-3 flex flex-col ">
      <h1 className="font-semibold">Post Content</h1>
      {validationError !== "" ? (
        <Label className="font-medium text-[13px] text-red-500 mb-1">
          {validationError}
        </Label>
      ) : (
        ""
      )}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        style={{ height: "40rem" }}
      />
    </div>
  );
}

export default ContentUpload;
