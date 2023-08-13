"use client";
import useValidationStore from "@/lib/validation-store";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function AddPostButton() {
  const router = useRouter();
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

    await axios
      .post("/api/blogpost", postData)
      .then(() => {
        toast({
          title: "Post was created succesfully",
          description: `Thank you for sharing your toughts with us, ${session.user.name}`,
        });
        router.push(`/`);
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request, ${err.response.data}`,
        });
      });
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
