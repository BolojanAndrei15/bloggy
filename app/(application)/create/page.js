import AddPostButton from "@/components/create/AddPostButton";
import ContentUpload from "@/components/create/ContentUpload";
import DescUpload from "@/components/create/DescUpload";
import Heading from "@/components/create/Heading";
import ImageUploader from "@/components/create/ImageUploader";
import SelectCategory from "@/components/create/SelectCategory";
import TagUpload from "@/components/create/TagUpload";
import TitleUpload from "@/components/create/TitleUpload";

function CreatePage() {
  return (
    <div>
      <div>
        <Heading
          title={"Create post"}
          desc={
            "Welcome to our Create Blogpost Page - Unleash Your Creativity and Share Your Voice!"
          }
        />
      </div>
      <div>
        <ImageUploader />
        <div className="flex flex-col space-y-3 mt-3">
          <TitleUpload />
          <DescUpload />
          <div className="flex flex-col md:flex-row w-full items-center justify-between">
            <div className="w-full md:w-[70%] xl:w-[80%] mr-2">
              <TagUpload />
            </div>
            <div className=" flex flex-col h-full w-full md:w-[30%] xl:w-[20%] mt-3 md:mt-0 ">
              <SelectCategory />
            </div>
          </div>
        </div>
        <div className="">
          <ContentUpload />
        </div>
        <AddPostButton />
      </div>
    </div>
  );
}

export default CreatePage;
