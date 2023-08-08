"use client";

import { useCallback, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

const isValidSize = (file) => {
  const maxFileSize = 2 * 1024 * 1024;
  return file && file.size <= maxFileSize;
};

const isValidImage = (file) => {
  return file.type.startsWith("image/");
};

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { toast } = useToast();
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
  );
}

export default ImageUploader;
