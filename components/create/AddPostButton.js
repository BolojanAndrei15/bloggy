"use client";
import useValidationStore from "@/lib/validation-store";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

function AddPostButton() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { title, desc, tags, category, content, image } = useValidationStore();

  async function handleSavePost() {
    const postData = {
      title,
      description: desc,
      categoryId: category,
      tags: tags,
      content,
      image,
      authorName: session.user.name,
      authorId: session.user.id,
    };

    await axios.post("/api/blogpost", postData).then(() => toast);
  }

  return (
    <div className="w-full">
      <Button onClick={handleSavePost} className="w-full">
        Add new Post
      </Button>
    </div>
  );
}

export default AddPostButton;
