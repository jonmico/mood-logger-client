import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiGetMoods } from "../services/moods/apiGetMoods";
import type { Mood } from "../types/mood";
import { getMoodEmoji } from "../utils/getMoodEmoji";

// TODO: Come up with some type of layout for Dashboard.

export default function Dashboard() {
  const { firstName } = useAuth();

  return (
    <div>
      <div>Hello, {firstName}! Welcome to Mood Logger!</div>
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
    <div>
      <div>Mood: {getMoodEmoji(mood.mood)}</div>
      <div>Notes: {mood.notes}</div>
    </div>
  );
}
