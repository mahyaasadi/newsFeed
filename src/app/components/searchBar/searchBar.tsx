import { useFormik } from "formik";
// types
import { ArticleItem } from "src/app/types/type";
// styles
import styles from "src/app/components/searchBar/searchBar.module.scss";
// react
import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch: (values: {
    title?: string;
    sortBy?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
  suggestions: ArticleItem[];
  isSearching: boolean;
};

const SearchBar = ({ onSearch, suggestions, isSearching }: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      sortBy: "popularity",
      dateFrom: "",
      dateTo: "",
    },
    onSubmit: (values) => {
      onSearch(values);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    formik.handleChange(e);
    setShowSuggestions(true);
    onSearch({ ...formik.values, [e.target.name]: e.target.value });
  };

  const handleSuggestionClick = (articleUrl: string) => {
    window.open(articleUrl, "_blank");
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.search_wrapper}`)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.searchBar_container}>
        <form onSubmit={formik.handleSubmit} className={styles.search_form}>
          <div
            className={styles.search_input_container}
            style={{ position: "relative" }}
          >
            <input
              type="text"
              name="title"
              placeholder="search for a title"
              onChange={handleInputChange}
              value={formik.values.title}
              className={styles.search_input}
            />

            {!isSearching ? (
              <span className={styles.search_icon}>🔍</span>
            ) : (
              <div className={styles.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>

          <div className={styles.sortBy_select_container}>
            <select
              name="sortBy"
              onChange={handleInputChange}
              value={formik.values.sortBy}
              className={styles.sortBy_select}
            >
              <option value="publishedAt">Published At</option>
              <option value="relevancy">Relevancy</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <div className={styles.date_input_container}>
            <input
              type="date"
              name="dateFrom"
              onChange={handleInputChange}
              value={formik.values.dateFrom}
              className={styles.date_input}
              placeholder="From"
            />
          </div>

          <div className={styles.date_input_container}>
            <input
              type="date"
              name="dateTo"
              onChange={handleInputChange}
              value={formik.values.dateTo}
              className={styles.date_input}
              placeholder="To"
            />
          </div>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestions_dropdown}>
            {suggestions.map((article, index) => (
              <div
                key={index}
                className={styles.suggestion_item}
                onClick={() => handleSuggestionClick(article.url)}
              >
                {article.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
