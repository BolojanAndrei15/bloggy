"use client";

import { useCallback, useEffect, useState } from "react";
import useValidationStore from "@/lib/validation-store";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-context-menu";

function TagUpload({ data }) {
  const [input, setInput] = useState(data ? data.toString() : "");
  const [hashtags, setHashtags] = useState(data ? data : []);

  useEffect(() => {
    if (data) {
      setInput(data.toString());
      setHashtags(data);
      setTagsValidation(data);
    }
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      setInput((prev) => (prev = e.target.value));

      const extractHashtags = (text) => {
        const regex = /(?<=\s|^)(#[a-zA-Z0-9_]{2,})(?=\s|$)/g;
        const matches = text.match(regex);

        return matches ? matches.map((match) => match.slice(1)) : [];
      };

      const extractedHashtags = extractHashtags(input);
      setTagsValidation(extractedHashtags);
      setHashtags(extractedHashtags);
    },
    [input]
  );

  const handleHastgasChange = useCallback(() => {
    if (hashtags.length == 0) {
      setTagsValidation("");
    }
  }, [hashtags]);

  const { setTagsValidation } = useValidationStore();

  return (
    <>
      <h1 className="font-semibold">Tags of the post</h1>
      <Input
        value={input}
        onChange={(e) => {
          handleInputChange(e);
          handleHastgasChange;
        }}
        placeholder="For the tag to be applied, the text should start with # and also be at least 2 char long...."
        className={`${
          input !== ""
            ? hashtags.length == 0
              ? "border-red-500"
              : "border-green-500"
            : ""
        }`}
      />
      {hashtags.length == 0 && input !== "" ? (
        <Label className="text-sm font-medium text-red-500">
          For the tag to be consider valid, it should start with '#' like
          '#accounting' and also be at least 2 char long
        </Label>
      ) : (
        ""
      )}
    </>
  );
}

export default TagUpload;
