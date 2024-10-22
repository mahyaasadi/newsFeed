"use client";
import { useArticlesGetAllQuery } from "@/store/api/slices/newsFeedSlice";

const NewsFeed = () => {
  // Fetching data
  const {
    data: articles,
    // error,
    // isLoading,
    // refetch,
  } = useArticlesGetAllQuery();

  console.log({ articles });

  return (
    <div className="">
      <div className="">
        main page to display top headlines and news articles
      </div>
    </div>
  );
};

export default NewsFeed;
