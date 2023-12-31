"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import useValidationStore from "@/lib/validation-store";

const ImageUploader = ({ data }) => {
  const { setValidImage } = useValidationStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setSelectedImage(null);
    setValidImage("");

    if (data) {
      setSelectedImage(data);
      setValidImage(data);
    }
  }, [data]);

  const handleImageChange = useCallback((file) => {
    const isValidImage = file.type.startsWith("image/");
    if (isValidImage) {
      const maxFileSize = 2 * 1024 * 1024;
      const isValidSize = file && file.size <= maxFileSize;
      if (isValidSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setValidImage(reader.result);
          setSelectedImage(reader.result);
        };
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
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleImageChange(file);
    },
    [handleImageChange]
  );

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
};

export default ImageUploader;
