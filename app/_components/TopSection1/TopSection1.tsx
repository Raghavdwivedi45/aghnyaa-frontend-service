import styles from "./TopSection1.module.scss";
import TopSectionCTAButtons from "./TopSectionCTAButtons/TopSectionCTAButtons";
import SVG from "../../../components/SVG/SVG";
import { heroStats } from "@/constants/constants";
import TopSectionTagLine from "./TopSectionTagLine/TopSectionTagLine";


const TopSection1 = () => {

  return (
    <section className={styles["hero-section-1"]}>
      
      <TopSectionTagLine/>

      <div className={styles["top-intro"]}>
        <h2>Rediscover Indic Wisdom Through Books, Videos and Living Traditions</h2>
        <p className={styles["hero-description"]}>
          Discover curated books, articles, videos, and research on India's civilizational knowledge and living traditions.
        </p>
      </div>

      <div className={styles["cta-buttons"]}>
        <TopSectionCTAButtons />
      </div>

      <ul className={styles["hero-stats"]}>
        {
          heroStats.map((item) => (
            <li key={item.icon} className={styles["hero-stat-item"]}>
              <span>
                <SVG type={item.icon} />
              </span>
              <span>{item.count}+ {item.label}</span>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default TopSection1;
