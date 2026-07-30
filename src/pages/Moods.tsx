import { PencilSparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { apiGetMoods } from "../services/moods/apiGetMoods";
import type { Mood } from "../types/mood";
import { getMoodEmoji } from "../utils/getMoodEmoji";
import styles from "./Moods.module.css";
import { format } from "date-fns";
import Spinner from "../components/Spinner";

// TODO: What happens if moods is empty?

export default function Moods() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMoods() {
      const result = await apiGetMoods(10);

      setMoods(result.moods);
      setIsLoading(false);
    }
    fetchMoods();
  }, []);

  if (isLoading) return <Spinner fullPage={true} />;

  return (
    <>
      <div className={styles.myMoodsBanner}>
        <h2>My Moods</h2>
        <Link to={"create"} className={styles.create}>
          <PencilSparkles />
          <div>Create Mood</div>
        </Link>
      </div>
      {moods.length === 0 ? (
        <div>
          <div>It looks like you have not created any moods yet!</div>
          <div>
            Click <Link to={"create"}>here</Link> to log your first mood.
          </div>
        </div>
      ) : (
        <MoodsList moods={moods} />
      )}
    </>
  );
}

interface MoodsListProps {
  moods: Mood[];
}

function MoodsList(props: MoodsListProps) {
  const moodsList = props.moods.map((mood) => {
    return <MoodCard mood={mood} key={mood.id} />;
  });

  return <ul className={styles.moodsList}>{moodsList}</ul>;
}

interface MoodCardProps {
  mood: Mood;
}

function MoodCard(props: MoodCardProps) {
  return (
    <li className={styles.moodCard}>
      <div>Rating: {getMoodEmoji(props.mood.mood)}</div>
      <div>Notes: {props.mood.notes}</div>
      <div>
        Created: {format(new Date(props.mood.created_at), "MMMM dd, yyyy")}
      </div>
    </li>
  );
}
