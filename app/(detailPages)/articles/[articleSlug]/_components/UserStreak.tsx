import React from 'react'
import styles from "../page.module.scss";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { fetchUserStreak } from '@/utils/userAPIs';
import ProgressRing from '@/components/ProgressRing/ProgressRing';

const UserStreak = async () => {
    const userInfo = await fetchUserStreak();

    return (
        <div className={styles["page-progress-info"]}>
            <div title={`Current Streak: ${userInfo?.streak?.currentStreak} days | Longest Streak: ${userInfo?.streak?.longestStreak} days`} className={styles["page-progress"]}>
                <ProgressRing size={60} progress={userInfo?.streak?.currentStreak ?? 0} total={userInfo?.streak?.longestStreak ?? 100} color="var(--button-primary-text)" />
            </div>
            <div className={styles["page-progress-2"]}>

                <h4><SVGWithText type='fire' value={`Keep going, ${userInfo?.user?.username ?? " great!"}`} height={16} width={16} direction='right' /></h4>

                {
                    userInfo?.streak?.currentStreak && userInfo?.streak?.longestStreak && (
                        <>
                            <h4 className={styles["streak-text"]}>{userInfo?.streak?.currentStreak} day current streak 🏃</h4>
                            <h4 className={styles["streak-text"]}>{userInfo?.streak?.longestStreak} day longest streak 🏃</h4>
                        </>
                    )
                }

                {
                    !userInfo?.streak?.currentStreak || !userInfo?.streak?.longestStreak &&
                    <>
                        <h4 className={styles["streak-text"]}>Login for streak</h4>
                    </>
                }

            </div>
        </div>
    )
}

export default UserStreak