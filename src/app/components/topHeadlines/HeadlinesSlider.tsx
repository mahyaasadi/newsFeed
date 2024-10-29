// react
import { useState } from "react";
// next
import Link from "next/link";
// types
import { ArticleItem } from "src/app/types/type";
// styles
import styles from "src/app/components/topHeadlines/headlinesSlider.module.scss";

type HeadlineProps = {
  data: ArticleItem[];
};

const HeadlinesSlider = ({ data }: HeadlineProps): JSX.Element => {
  // states
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const cardsPerPage = 5;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerPage >= data.length ? 0 : prevIndex + cardsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsPerPage < 0
        ? data.length - cardsPerPage
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
          {data?.slice(currentIndex, currentIndex + cardsPerPage)
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
