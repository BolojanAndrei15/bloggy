"use client";

import DescUpload from "@/components/create/DescUpload";
import Heading from "@/components/create/Heading";
import ImageUploader from "@/components/create/ImageUploader";
import TagUpload from "@/components/create/TagUpload";
import TitleUpload from "@/components/create/TitleUpload";
import useValidationStore from "@/lib/validation-store";

function CreatePage() {
  return (
    <div>
      <div>
        <Heading />
      </div>
      <div>
        <ImageUploader />
        <div className="flex flex-col space-y-3 mt-3">
          <TitleUpload />
          <DescUpload />
          <TagUpload />
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
