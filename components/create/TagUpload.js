"use client";

import { useCallback, useEffect, useState } from "react";
import useValidationStore from "@/lib/validation-store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function TagUpload({ data }) {
  const [input, setInput] = useState(data ? data.join("") : "");
  const [tags, setTags] = useState(data ? data : []);
  const { setTagsValidation } = useValidationStore();

  useEffect(() => {
    setTagsValidation("");

    if (data) {
      setInput(data.join(" "));
      setTags(data);
      setTagsValidation(data);
    }
  }, []);

  const validateInput = (text) => {
    const words = text.split(/[\s,]+/);
    const invalidWords = words.filter(
      (word) =>
        word.length < 2 || word.length > 25 || !/^[a-zA-Z0-9_-]+$/.test(word)
    );
    return invalidWords.length === 0;
  };

  const handleInputChange = useCallback((e) => {
    const newText = e.target.value;
    setInput(newText);

    const extractedTags = validateInput(newText) ? newText.split(/[\s,]+/) : [];

    setTagsValidation(extractedTags);
    setTags(extractedTags);
  }, []);

  return (
    <>
      <h1 className="font-semibold">Tags of the post</h1>
      <Input
        value={input}
        onChange={(e) => handleInputChange(e)}
        placeholder="Use words separated by commas or spaces, at least 2 characters long..."
        className={`${
          input !== "" && !validateInput(input)
            ? "border-red-500"
            : "border-green-500"
        }`}
      />
      {!validateInput(input) && input !== "" ? (
        <Label className="text-sm font-medium text-red-500">
          Tags should be 2 to 20 characters long and may contain letters,
          numbers, underscores, hyphens, and no spaces.
        </Label>
      ) : (
        ""
      )}
    </>
  );
}

export default TagUpload;
