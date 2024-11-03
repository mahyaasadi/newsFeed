// react
import { useState } from "react";
// next
import Link from "next/link";
// styles
import styles from "src/app/components/topHeadlines/headlinesSlider.module.scss";
// api slice
import { useGetAllTopHeadlinesQuery } from "src/store/api/slices/newsFeedSlice";

const HeadlinesSlider = (): JSX.Element => {
  // states
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const cardsPerPage = 5;

  // fetching headlines
  const { data: topHeadlines } = useGetAllTopHeadlinesQuery();
  const headlines = topHeadlines?.articles || [];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerPage >= headlines.length
        ? 0
        : prevIndex + cardsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsPerPage < 0
        ? headlines.length - cardsPerPage
        : prevIndex - cardsPerPage
    );
  };

  return (
    <div className={styles.slider_container}>
      <button onClick={handlePrev} className={styles.prev_button}>
        &#8249;
      </button>

      <div className={styles.card_wrapper}>
        <div className={styles.card_container}>
          {headlines
            ?.slice(currentIndex, currentIndex + cardsPerPage)
            .map((headline, index) => (
              <Link
                href={headline.url}
                target="_blank"
                key={index}
                className={styles.card}
              >
                <h3>{headline.title}</h3>
              </Link>
            ))}
        </div>
      </div>

      <button onClick={handleNext} className={styles.next_button}>
        &#8250;
      </button>
    </div>
  );
};

export default HeadlinesSlider;
