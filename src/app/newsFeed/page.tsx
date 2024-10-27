// newsFeed page
"use client";
import { useCallback, useEffect, useState } from "react";
import { Article } from "@/app/types/type";
import Loader from "@/app/components/shared/Loader";
import ArticleCard from "@/app/components/newsArticles/ArticleCard";
import {
  useArticlesGetAllQuery,
  useTopHeadlinesGetAllQuery,
} from "@/store/api/slices/newsFeedSlice";

const NewsFeed = () => {
  const [page, setPage] = useState<number>(1);
  const [articlesList, setArticlesList] = useState(Array<Article>());

  // Fetching data
  const {
    data: articles,
    error: articlesError,
    isLoading: articlesIsLoading,
    isFetching,
  } = useArticlesGetAllQuery(page);

  const {
    data: topHeadlines,
    error: topHeadlinesError,
    isLoading: topHeadlinesIsLoading,
  } = useTopHeadlinesGetAllQuery();

  useEffect(() => {
    if (articles) {
      setArticlesList((prevArticles) => [
        ...prevArticles,
        ...articles.articles,
      ]);
    }
  }, [articles]);

  // Debounced scroll handler to optimize performance
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200; // Adding a threshold before reaching the bottom

    if (bottom && !articlesIsLoading && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [articlesIsLoading, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {articlesIsLoading && page === 1 ? (
        <Loader />
      ) : (
        <ArticleCard data={articlesList} />
      )}
      {isFetching && page > 1 && <Loader />}
    </div>
  );
};

export default NewsFeed;
