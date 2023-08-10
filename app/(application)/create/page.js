"use client";

import DescUpload from "@/components/create/DescUpload";
import Heading from "@/components/create/Heading";
import ImageUploader from "@/components/create/ImageUploader";
import TitleUpload from "@/components/create/TitleUpload";
import useValidationStore from "@/lib/validation-store";
import React, { useCallback, useState } from "react";

function CreatePage() {
  return (
    <div>
      <div>
        <Heading />
      </div>
      <div>
        <ImageUploader />
        <TitleUpload />
        <DescUpload />
      </div>
    </div>
  );
}

export default CreatePage;
