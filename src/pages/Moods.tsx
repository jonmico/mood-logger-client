import { Link } from "react-router";
import styles from "./Moods.module.css";
import { PencilSparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Mood } from "../types/mood";
import { apiGetMoods } from "../services/moods/apiGetMoods";
import { getMoodEmoji } from "../utils/getMoodEmoji";
import { groupMoodsByDay } from "../utils/groupMoodsByDay";

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

  //TODO: This is a placeholder loading state.
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div>
        <h2>This is the Moods page!</h2>
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
      </div>
      <Link to={"create"} className={styles.create}>
        <PencilSparkles />
        <div>Create Mood</div>
      </Link>
    </div>
  );
}

interface MoodsListProps {
  moods: Mood[];
}

function MoodsList(props: MoodsListProps) {
  const groupedMoods = groupMoodsByDay(props.moods);

  const moodsList = Array.from(groupedMoods).map(([date, moods]) => {
    return (
      <li key={date}>
        <div>{date}</div>
        <ul>
          {moods.map((mood) => {
            return (
              <li key={mood.id}>
                <div>{getMoodEmoji(mood.mood)}</div>
                <div>Notes: {mood.notes}</div>
              </li>
            );
          })}
        </ul>
      </li>
    );
  });

  return <ul>{moodsList}</ul>;
}
