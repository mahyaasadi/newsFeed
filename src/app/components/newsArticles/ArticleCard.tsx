// next
import Link from "next/link";
// types
import { Article } from "src/app/types/type";
// styles
import styles from "src/app/components/newsArticles/articleCard.module.scss";

type ArticleCardProps = {
  data?: Article[];
};

const ArticleCard = ({ data }: ArticleCardProps): JSX.Element => {
  return (
    <div className={styles.articlesList}>
      {data?.map((article, index) => (
        <div className={styles.articleCard} key={index}>
          <div className={styles.articleImgContainer}>
            {article.urlToImage ? (
              <img
                className={styles.articleImg}
                src={article.urlToImage ?? undefined}
                alt="articleImg"
              ></img>
            ) : (
              <div className={styles.defaultArticleImg}></div>
            )}

            <div className={styles.articleLink}>
              <Link href="#" target="_blank">
                Read more
              </Link>
            </div>
          </div>

          <div className={styles.articleContent}>
            <h5>{article.title}</h5>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleCard;
