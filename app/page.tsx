import TopSection1 from '@/app/_components/TopSection1/TopSection1';
import styles from './page.module.scss';
import HomePageCard from '@/app/_components/HomePageCard/HomePageCard';

export const metadata = {
  title: 'Aghnyaa',
  description:
    "Discover curated books, articles, videos, and research on India's civilizational knowledge and living traditions.",
};

export default function Home() {
  return (
    <div className={styles['page-container']}>
      <TopSection1 />
      <HomePageCard />
      <HomePageCard variant="article" direction="row-reverse" />
      <HomePageCard variant="video" />
    </div>
  );
}
