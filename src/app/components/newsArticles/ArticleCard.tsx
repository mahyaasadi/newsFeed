// import Link from "next/link";
import styles from "./articleCard.module.scss";
import { ArticlesResponse } from "@/app/types/type";

type ArticleCardProps = {
  data?: ArticlesResponse;
};

const ArticleCard = ({ data }: ArticleCardProps): JSX.Element => {
  console.log({ data });

  return (
    <div className={styles.articlesList}>
      {data?.articles.map((article, index) => (
        <div className={styles.articleCard} key={index}>
          <div className={styles.articleImgContainer}>
            <img
              className={`w-100 ${styles.articleImg}`}
              src={article.urlToImage ?? undefined}
              alt="articleImg"
            ></img>

            {/* <div className={styles.articleLink}>
                  <Link
                    href="#"
                    target="_blank"
                  >
                    Read more
                  </Link>
                </div> */}
          </div>

          {/* cardDetails */}
          <div className="px-2 height-11">
            <p className="py-1 font-15 mt-2 fw-bold">
              {/* {articleData.Title.length > 35 ? (articleData.Title.substr(0, 35) + " ...") : articleData.Title} */}
            </p>
            <div className="pb-2 font-12 text-secondary">
              title
              {/* {articleData.EngTitle.length > 35 ? articleData.EngTitle.substr(0, 20) + " ..." : articleData.EngTitle} */}
            </div>
          </div>

          {/* <hr /> */}

          <div
            className="d-flex justify-flex-end gap-1 flex-wrap"
            id="infoContainer"
          >
            {/* <button
                  type="button"
                  data-pr-position="right"
                  className="padding-sm btn btn-sm btn-outline-primary font-12 subArticle d-flex align-items-center"
                  onClick={() =>
                    openSubArticleModal(articleData, articleData._id)
                  }
                >
                  <Tooltip target=".subArticle">زیر مقاله ها</Tooltip>
                  <FeatherIcon
                    style={{ width: "15px", height: "15px" }}
                    icon="layers"
                  />
                </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleCard;
