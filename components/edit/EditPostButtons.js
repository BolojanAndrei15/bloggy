import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import useValidationStore from "@/lib/validation-store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

function EditPostButtons() {
  const params = useParams();
  const [id] = params.id;

  const router = useRouter();

  const { title, desc, tags, category, content, image } = useValidationStore();
  const { toast } = useToast();

  const handleEdit = async () => {
    const res = await axios
      .post("/api/blogpost/edit", {
        postId: id,
        title,
        desc,
        tags,
        categoryId: category,
        content,
        image,
      })
      .then(() => {
        toast({
          title: `Post was succesfully edited`,
          description:
            "🚀 Embrace Change, Embrace You! Discover the Power of Possibilities, Where Every Edit is a Step Towards Your Unique Journey of Growth. 🌱✨",
        });
        router.push(`/post/${id}`);
      });
  };

  const handleDelete = async () => {
    await axios.post("/api/blogpost/delete", { postId: id }).then(() => {
      toast({
        title: `Post was deleted succesfully`,
        description: "What are you waiting, go now and write a new one",
        action: (
          <ToastAction
            onClick={() => router.push("/create")}
            altText="Try again"
          >
            Create now
          </ToastAction>
        ),
      });
      router.push("/");
    });
  };

  return (
    <div className="w-full flex flex-col space-y-3 sm:flex-row  md:justify-end sm:space-x-3 sm:space-y-0">
      <Button
        onClick={() => handleDelete()}
        variant="destructive"
        className="w-full md:w-[15rem] "
      >
        <div className="w-[50%] flex justify-around md:justify-between items-center">
          Delete Post
          <Trash2 />
        </div>
      </Button>
      <Button
        onClick={() => handleEdit()}
        variant="outline"
        className="w-full md:w-[15rem]"
      >
        <div className="w-[50%] flex justify-around md:justify-between items-center">
          Save Post
          <Pencil />
        </div>
      </Button>
    </div>
  );
}

export default EditPostButtons;
