import styles from './HomePageCard.module.scss';
import BookInfo from './BookInfo/BookInfo';
import { IBook, IHomeCardVariant, IVideo } from '@/constants/interfaces';
import { homeCardInformation } from '@/constants/constants';
import ArticleInfo from './ArticleInfo/ArticleInfo';
import VideoInfo from './VideoInfo/VideoInfo';
import { sampleBooks, sampleVideo } from '@/constants/MOCK_DATA';
import { fetchMyPublished } from '@/utils/articleAPIs';

export default async function HomePageCard({ direction = "row", variant = "book" }: IHomeCardVariant) {
    const articles = await fetchMyPublished();
    console.log("articles")
    console.log(articles)
    if (!articles?.articlesWithAuthors?.length) return <div>No article found</div>
    // fetch 3 top books here
    // fetch 3 top videos here
    const content = variant === "book" ? sampleBooks : sampleVideo;
    return (
        <section className={direction === 'row-reverse' ? styles.showcaseSectionReverse : styles.showcaseSection}>
            {
                variant !== "video" &&
                <div className={`${styles.heading} ${direction === 'row-reverse' ? styles.headingReverse : ""}`}>
                    <h2 className={styles.title}>
                        {homeCardInformation[variant]?.header}
                    </h2>
                    <p className={styles.subtitle}>
                        {homeCardInformation[variant]?.text}
                    </p>
                </div>
            }
            {
                variant === "book" &&
                <BookInfo currentBooks={content as IBook[]} />

            }
            {
                variant === "article" &&
                <ArticleInfo currentArticles={articles.articlesWithAuthors} />

            }
            {
                variant === "video" &&
                <VideoInfo currentVideos={content as IVideo[]} />

            }
        </section>
    );
}
