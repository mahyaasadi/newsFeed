"use client";

import {
  useArticlesGetAllQuery,
  useTopHeadlinesGetAllQuery,
} from "@/store/api/slices/newsFeedSlice";
import ArticleCard from "@/app/components/newsArticles/ArticleCard";

const NewsFeed = () => {
  // Fetching data
  const {
    data: articles,
    error: articlesError,
    isLoading: articlesIsLoading,
  } = useArticlesGetAllQuery();

  const {
    data: topHeadlines,
    error: topHeadlinesError,
    isLoading: topHeadlinesIsLoading,
  } = useTopHeadlinesGetAllQuery();

  console.log({ topHeadlines, articles });

  return (
    <div className="">
      <ArticleCard data={articles} />
    </div>
  );
};

export default NewsFeed;
