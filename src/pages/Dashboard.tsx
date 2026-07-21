import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiGetMoods } from "../services/moods/apiGetMoods";
import type { Mood } from "../types/mood";
import { getMoodEmoji } from "../utils/getMoodEmoji";

export default function Dashboard() {
  const { firstName } = useAuth();
  const [moods, setMoods] = useState<Mood[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMoods() {
      const data = await apiGetMoods(1);
      setMoods(data.moods);
      setIsLoading(false);
    }
    getMoods();
  }, []);

  const mood = moods[0];

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div>Hello, {firstName}! Welcome to Mood Logger!</div>
          <div>
            <h2>Most recent mood:</h2>
            <div>
              <div>Mood rating: {getMoodEmoji(mood.mood)}</div>
              <div>Mood notes: {mood.notes}</div>
              <div>Mood created: {mood.created_at}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function RecentMood() {
  const [mood, setMood] = useState();
}
