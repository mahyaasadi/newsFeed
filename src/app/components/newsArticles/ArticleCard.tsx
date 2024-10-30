// next
import Link from "next/link";
import Image from "next/image";
// types
import { ArticleItem } from "src/app/types/type";
// styles
import styles from "src/app/components/newsArticles/articleCard.module.scss";

type ArticleCardProps = {
  data?: ArticleItem[];
};

const ArticleCard = ({ data }: ArticleCardProps): JSX.Element => {
  return (
    <div className={styles.articles_list}>
      {data?.map((article, index) => (
        <div className={styles.article_card} key={index}>
          <div className={styles.article_img_container}>
            {article.urlToImage ? (
              <Image
                src={article.urlToImage ?? undefined}
                alt="articleImg"
                layout="responsive"
                width={10}
                height={8}
                className={styles.article_img}
              />
            ) : (
              <div className={styles.default_article_img}></div>
            )}

            <div className={styles.article_link}>
              <Link href={article.url} target="_blank">
                Read more
              </Link>
            </div>
          </div>

          <div className={styles.article_content}>
            <h5>{article.title}</h5>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleCard;
