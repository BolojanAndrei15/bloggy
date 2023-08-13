"use client";
import Error from "next/error";
import ContentUpload from "@/components/create/ContentUpload";
import DescUpload from "@/components/create/DescUpload";
import Heading from "@/components/create/Heading";
import ImageUploader from "@/components/create/ImageUploader";
import SelectCategory from "@/components/create/SelectCategory";
import TagUpload from "@/components/create/TagUpload";
import TitleUpload from "@/components/create/TitleUpload";
import EditPostButtons from "@/components/edit/EditPostButtons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import ContentLoader from "@/components/main-page/ContentLoader";

function EditPage() {
  const params = useParams();
  const [id] = params.id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editPost"],
    queryFn: async () => {
      const res = await axios.post("/api/post", { postId: id });
      return res.data;
    },
  });

  return (
    <>
      {isLoading ? (
        <ContentLoader />
      ) : isError ? (
        <Error statusCode={404} />
      ) : (
        <div>
          <div>
            <Heading
              title={"Edit post"}
              desc={
                "Ready to shape your digital identity? Let's get started. Your online journey awaits your careful curation and attention to detail."
              }
            />
          </div>
          <div>
            <ImageUploader data={data.image} />
            <div className="flex flex-col space-y-3 mt-3">
              <TitleUpload data={data.title} />
              <DescUpload data={data.description} />
              <div className="flex flex-col md:flex-row w-full items-center justify-between">
                <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
                  <TagUpload data={data.tags} />
                </div>
                <div className=" flex flex-col h-full w-full md:w-[30%] xl:w-[20%] mt-3 md:mt-0 ">
                  <SelectCategory dataI={data.categoryId} />
                </div>
              </div>
            </div>
            <div className="">
              <ContentUpload data={data.content} />
            </div>
            <EditPostButtons />
          </div>
        </div>
      )}
    </>
  );
}

export default EditPage;
