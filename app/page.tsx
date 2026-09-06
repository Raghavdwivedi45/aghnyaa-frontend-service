import TopSection1 from "@/app/_components/TopSection1/TopSection1";
import styles from "./page.module.scss";
import HomePageCard from "@/app/_components/HomePageCard/HomePageCard";

export default function Home() {
  return (
    <div className={styles["page-container"]}>
      <TopSection1 />
      <HomePageCard />
      <HomePageCard variant="article" direction="row-reverse" />
      <HomePageCard variant="video" />
    </div>
  );
}
