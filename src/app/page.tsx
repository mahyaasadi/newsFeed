"use client";
// react
import { useCallback, useEffect, useState } from "react";
// next
import { useRouter } from "next/navigation";
// styles
import styles from "src/app/page.module.scss";
// types
import { ArticleItem } from "src/app/types/type";
// hooks
import { useDebounce } from "src/app/components/searchBar/useDebounce";
// components
import Loader from "src/app/components/shared/Loader";
import SearchBar from "src/app/components/searchBar/SearchBar";
import ArticleCard from "src/app/components/newsArticles/ArticleCard";
import HeadlinesSlider from "src/app/components/topHeadlines/HeadlinesSlider";
// api slice
import {
  useGetAllArticlesQuery,
  useGetAllTopHeadlinesQuery,
  useSearchOnArticlesMutation,
} from "src/store/api/slices/newsFeedSlice";

const NewsFeed = (): JSX.Element => {
  const router = useRouter();

  // states
  const [pageNumber, setPageNumber] = useState<number>(1);
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
    error: articlesError,
    isFetching,
  } = useGetAllArticlesQuery(pageNumber);

  // Articles state
  const [articlesList, setArticlesList] = useState<ArticleItem[]>(
    articles?.articles || []
  );

  // Search on articles
  const [searchOnArticles, { isLoading: isSearching, error: searchError }] =
    useSearchOnArticlesMutation();

  const {
    data: topHeadlines,
    isLoading: headlinesIsLoading,
    error: topHeadlinesError,
  } = useGetAllTopHeadlinesQuery();

  useEffect(() => {
    if (articles) {
      setArticlesList((prevArticles) => [
        ...prevArticles,
        ...articles.articles,
      ]);
    }
  }, [articles]);

  useEffect(() => {
    if (articlesError || topHeadlinesError) {
      const errStatus =
        (articlesError && "status" in articlesError && articlesError.status) ||
        (topHeadlinesError &&
          "status" in topHeadlinesError &&
          topHeadlinesError.status);

      const statusCode = errStatus?.toString() || "500";
      router.push(`/error/${statusCode}`);
    }
  }, [articlesError, topHeadlinesError, router]);

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

      const result = await searchOnArticles(values).unwrap();
      setSuggestions(result.articles?.slice(0, 5));
      setFilteredArticles(result.articles);

      // Set no results message if the result is empty
      if (result.articles.length === 0) {
        setNoResultsMessage(`No results for "${values.title}" were found`);
      } else {
        setNoResultsMessage(null);
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
      // for smoother throttling
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleThrottledScroll);
    return () => {
      window.removeEventListener("scroll", handleThrottledScroll);
    };
  }, [handleScroll]); // Only reattach if `handleScroll` changes

  return (
    <>
      {(articlesIsLoading || headlinesIsLoading) && pageNumber === 1 ? (
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
          ) : searchError ? (
            <div className={styles.no_results_message}>
              an error occurred while searching
            </div>
          ) : (
            articles && (
              <>
                <HeadlinesSlider />
                <ArticleCard data={filteredArticles || articlesList} />
              </>
            )
          )}

          {isFetching && pageNumber > 1 && <Loader />}
        </>
      )}
    </>
  );
};

export default NewsFeed;
