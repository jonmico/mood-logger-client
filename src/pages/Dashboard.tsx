import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiGetMoods } from "../services/moods/apiGetMoods";
import type { Mood } from "../types/mood";
import { getMoodEmoji } from "../utils/getMoodEmoji";
import styles from "./Dashboard.module.css";
import { Link } from "react-router";
import { StickyNotePlus } from "lucide-react";

// TODO: Come up with some type of layout for Dashboard.

export default function Dashboard() {
  const { firstName } = useAuth();

  return (
    <div>
      <div className={styles.dashboardHeaderWrapper}>
        <h1>Hello, {firstName}! Welcome to Mood Logger!</h1>
        <div>
          <Link to={"/moods/create"} className={styles.link}>
            <div>
              <StickyNotePlus />
            </div>
            <div>Add Mood</div>
          </Link>
        </div>
      </div>
      <RecentMood />
    </div>
  );
}

// TODO: Make RecentMood look a little prettier.

function RecentMood() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMood() {
      const data = await apiGetMoods(1);

      const [dataMood] = data.moods;

      setMood(dataMood);
      setIsLoading(false);
    }
    getMood();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!mood) {
    return <div>You have not logged any moods yet!</div>;
  }

  return (
    <div className={styles.recentMoodWrapper}>
      <div>
        <h2>Your most recent mood:</h2>
        <div className={styles.moodWrapper}>
          <div className={styles.moodRating}>
            <div>Mood Rating:</div>
            <div className={styles.emoji}>{getMoodEmoji(mood.mood)}</div>
          </div>
          <div className={styles.notes}>
            <div className={styles.notesHeader}>Notes:</div>
            <div className={styles.notesText}>{mood.notes}</div>
          </div>
          <div>
            <Link to={`/moods/${mood.id}`} className={styles.link}>
              View Mood
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
