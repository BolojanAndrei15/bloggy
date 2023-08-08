"use client";

import { Input } from "@/components/ui/input";
import { BookmarkPlus, ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { modules } from "@/lib/react-quill-modules";
import "react-quill/dist/quill.snow.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

const PostInput = ({ title, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="font-medium">{title}</h1>
      <Input placeholder={placeholder} />
    </div>
  );
};
const isValidSize = (file) => {
  const maxFileSize = 2 * 1024 * 1024;
  return file && file.size <= maxFileSize;
};

function CreatePage() {
  const [value, setValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { toast } = useToast();

  const isValidImage = (file) => {
    return file.type.startsWith("image/");
  };

  const handleImageChange = (file) => {
    setSelectedImage(URL.createObjectURL(file));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      if (isValidImage(file)) {
        if (isValidSize(file)) {
          handleImageChange(file);
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Image size exceeds the maximum limit (2MB)",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Invalid image format. Please upload an image file (e.g., JPG, PNG).",
        });
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="font-bold text-2xl">Create post</h1>
        <p className="text-md">
          Welcome to our Create Blogpost Page - Unleash Your Creativity and
          Share Your Voice!
        </p>
      </div>
      <div className="mb-7">
        <div
          {...getRootProps()}
          className={`file-drop-area ${
            isDragActive ? "drag-active" : ""
          } flex h-[250px] sm:h-[450px] w-full items-center justify-center rounded-md border border-dashed text-sm cursor-pointer `}
        >
          <input {...getInputProps()} accept="image/*" />
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Upload preview"
              className="w-full h-full object-cover "
            />
          ) : (
            <div className="flex flex-col justify-center items-center text-slate-300 ">
              <ImagePlus strokeWidth={0.75} className="w-20 h-20" />
              <h1 className="text-md">{"Upload image (max 2 MB)"}</h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <PostInput
          title={"Title of the post"}
          placeholder={
            "The Art of Mindfulness: Finding Peace in a Chaotic World"
          }
        />

        <PostInput
          title={"Description of the post"}
          placeholder={
            "In a world filled with constant distractions and ever-increasing demands, finding inner peace ..."
          }
        />

        <div className="flex flex-col md:flex-row w-full items-center justify-between">
          <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
            <PostInput
              title={"Tags of the post"}
              placeholder={"Example: #beauty, #nature, #life"}
            />
          </div>
          <div className="w-full md:w-[30%] xl:w-[20%] mt-3 md:mt-0 ">
            <h1>Select category</h1>
            <Select>
              <SelectTrigger className="w-full md:w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <Dialog>
                  <DialogTrigger className="w-full">
                    {" "}
                    <Button className="w-full flex justify-between">
                      Add new category
                      <BookmarkPlus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Discover and Define: Create Your Category
                      </DialogTitle>
                      <DialogDescription>
                        The Art of Categorization: Sculpt Your Own Realm of
                        Imagination!
                      </DialogDescription>
                    </DialogHeader>
                    <PostInput
                      title={"Name of the new category"}
                      placeholder={"Example: Tech ..."}
                    />
                    <div className="flex w-full md:justify-end">
                      <Button className="w-full md:w-48 flex justify-between">
                        Add new Category
                        <BookmarkPlus />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-[50rem] sm:h-[47rem] ">
          <h1 className="font-semibold">Post Content</h1>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            style={{ height: "40rem" }}
          />
        </div>
      </div>
      <div className=" flex justify-end">
        <Button className="w-full">Add post</Button>
      </div>
    </div>
  );
}

export default CreatePage;
