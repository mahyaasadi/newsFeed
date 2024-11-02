"use client";
// react
import { useCallback, useEffect, useState } from "react";
// types
import { ArticleItem } from "src/app/types/type";
// styles
import styles from "src/app/page.module.scss";
// hooks
import { useDebounce } from "src/app/components/searchBar/useDebounce";
// components
import Loader from "src/app/components/shared/Loader";
import ArticleCard from "src/app/components/newsArticles/ArticleCard";
import SearchBar from "src/app/components/searchBar/SearchBar";
// api slices
import {
  useGetAllArticlesQuery,
  useSearchOnArticlesMutation,
} from "src/store/api/slices/newsFeedSlice";

const NewsFeed = () => {
  // states
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [articlesList, setArticlesList] = useState(Array<ArticleItem>());
  const [filteredArticles, setFilteredArticles] = useState<
    ArticleItem[] | null
  >(null);
  const [suggestions, setSuggestions] = useState<ArticleItem[]>([]);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null);
  const [searchValues, setSearchValues] = useState<{
    title?: string;
    sortBy?: string;
    dateFrom?: string;
    dateTo?: string;
  }>({
    title: "",
    sortBy: "popularity",
    dateFrom: "",
    dateTo: "",
  });

  const debouncedSearchValues = useDebounce(searchValues);

  // Fetching data
  const {
    data: articles,
    isLoading: articlesIsLoading,
    isFetching,
  } = useGetAllArticlesQuery(pageNumber);

  // Search on articles
  const [searchOnArticles, { isLoading: isSearching }] =
    useSearchOnArticlesMutation();

  useEffect(() => {
    if (articles && !filteredArticles) {
      setArticlesList((prevArticles) => [
        ...prevArticles,
        ...articles.articles,
      ]);
    }
  }, [articles, filteredArticles]);

  // Trigger search when debounced values changes and also title exists
  useEffect(() => {
    const handleSearch = async (values: {
      title?: string;
      sortBy?: string;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      if (!values.title) {
        setFilteredArticles(null);
        setNoResultsMessage(null);
        setSuggestions([]);
        return;
      }

      try {
        const result = await searchOnArticles(values).unwrap();
        setSuggestions(result.articles?.slice(0, 5));
        setFilteredArticles(result.articles);

        // Set no results message if the result is empty
        if (result.articles.length === 0) {
          setNoResultsMessage(`No results for "${values.title}" were found`);
        } else {
          setNoResultsMessage(null);
        }
      } catch (error) {
        // console.error("Search failed:", error);
      }
    };

    handleSearch(debouncedSearchValues);
  }, [debouncedSearchValues, searchOnArticles]);

  // Debounced scroll handler to optimize performance
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200;

    if (bottom && !articlesIsLoading && !isFetching && !filteredArticles) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [articlesIsLoading, isFetching, filteredArticles]);

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
        <>
          <SearchBar
            onSearch={(values) => setSearchValues(values)}
            suggestions={suggestions}
            isSearching={isSearching}
          />
          {noResultsMessage ? (
            <div className={styles.no_results_message}>{noResultsMessage}</div>
          ) : (
            <ArticleCard data={filteredArticles || articlesList} />
          )}
        </>
      )}
      {isFetching && pageNumber > 1 && <Loader />}
    </>
  );
};

export default NewsFeed;
