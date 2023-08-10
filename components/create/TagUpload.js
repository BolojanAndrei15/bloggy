import { useEffect, useState } from "react";

import useValidationStore from "@/lib/validation-store";
import { Input } from "../ui/input";

function TagUpload() {
  const [inputText, setInputText] = useState("");
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    setInputText("");
    setHashtags([]);
  });

  const extractHashtags = (text) => {
    const regex = /(?<=\s|^)(#[a-zA-Z0-9_]{2,})(?=\s|$)/g;
    const matches = text.match(regex);

    return matches ? matches.map((match) => match.slice(1)) : [];
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);

    const extractedHashtags = extractHashtags(text);
    setHashtags(extractedHashtags);
  };
  const { setTagsValidation } = useValidationStore();

  useEffect(() => {
    if (hashtags.length >= 1) {
      setTagsValidation(hashtags);
    } else {
      setTagsValidation([]);
    }
  }, [hashtags]);
  return (
    <>
      <h1 className="font-semibold">Tags</h1>
      <Input
        onChange={handleInputChange}
        placeholder="For the tag to be applied, the text should start with # ...."
        className={`${
          inputText != ""
            ? hashtags.length != 0
              ? "border-green-500"
              : "border-red-500"
            : ""
        }`}
      />
    </>
  );
}

export default TagUpload;
