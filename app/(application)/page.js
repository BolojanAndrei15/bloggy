import BlogPost from "@/components/main-page/BlogPost";
import Heading from "@/components/main-page/Heading";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Heading />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-5 lg:grid-cols-3">
        <BlogPost
          id={"2"}
          title={"Title"}
          desc={"Desc"}
          createdAt={"28/04.2020"}
          tags={["#123", "#cevaFain"]}
        />
        <BlogPost
          id={"2"}
          title={"Title"}
          desc={"Desc"}
          createdAt={"28/04.2020"}
          tags={["#123", "#cevaFain"]}
        />
      </div>
    </div>
  );
}
