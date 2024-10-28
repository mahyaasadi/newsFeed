"use client";
// react
import { useCallback, useEffect, useState } from "react";
// types
import { ArticleItem } from "src/app/types/type";
// components
import Loader from "src/app/components/shared/Loader";
import ArticleCard from "src/app/components/newsArticles/ArticleCard";
// api slices
import { useGetAllArticlesQuery } from "src/store/api/slices/newsFeedSlice";

const NewsFeed = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [articlesList, setArticlesList] = useState(Array<ArticleItem>());

  // Fetching data
  const {
    data: articles,
    isLoading: articlesIsLoading,
    isFetching,
  } = useGetAllArticlesQuery(pageNumber);

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
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [articlesIsLoading, isFetching]);

  // Throttle scroll event to reduce load
  useEffect(() => {
    const handleThrottledScroll = () => {
      // Use requestAnimationFrame for smoother throttling
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", handleThrottledScroll);
    return () => {
      window.removeEventListener("scroll", handleThrottledScroll);
    };
  }, [handleScroll]); // Only reattach if `handleScroll` changes

  return (
    <>
      {articlesIsLoading && pageNumber === 1 ? (
        <Loader />
      ) : (
        <ArticleCard data={articlesList} />
      )}
      {isFetching && pageNumber > 1 && <Loader />}
    </>
  );
};

export default NewsFeed;
