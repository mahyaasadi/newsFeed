"use client";
// react
import { useCallback, useEffect, useState } from "react";
// types
import { Article } from "src/app/types/type";
// components
import Loader from "src/app/components/shared/Loader";
import ArticleCard from "src/app/components/newsArticles/ArticleCard";
// ApiSlices
import {
  useGetAllArticlesQuery,
  useGetAllTopHeadlinesQuery,
} from "src/store/api/slices/newsFeedSlice";

const NewsFeed = () => {
  // States
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [articlesList, setArticlesList] = useState(Array<Article>());

  // Fetching data
  const {
    data: articles,
    isLoading: articlesIsLoading,
    isFetching,
  } = useGetAllArticlesQuery(pageNumber);

  // const {
  //   data: topHeadlines,
  //   error: topHeadlinesError,
  //   isLoading: topHeadlinesIsLoading,
  // } = useGetAllTopHeadlinesQuery();

  useEffect(() => {
    if (articles) {
      setArticlesList((prevArticles) => [
        ...prevArticles,
        ...articles.articles,
      ]);
    }
  }, [articles]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Debounced scroll handler to optimize performance
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200; // Adding a threshold before reaching the bottom

    if (bottom && !articlesIsLoading && !isFetching) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [articlesIsLoading, isFetching]);

  return (
    <div>
      {articlesIsLoading && pageNumber === 1 ? (
        <Loader />
      ) : (
        <ArticleCard data={articlesList} />
      )}
      {isFetching && pageNumber > 1 && <Loader />}
    </div>
  );
};

export default NewsFeed;
