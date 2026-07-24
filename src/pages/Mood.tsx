import { useEffect, useState } from "react";
import type { Mood } from "../types/mood";
import { useParams } from "react-router";
import { apiGetMood } from "../services/moods/apiGetMood";

export default function Mood() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getMood() {
      const data = await apiGetMood(id);

      if (data.ok === true) {
        setMood(data.mood);
        setIsLoading(false);
        setError("");
      } else {
        setError(data.error);
        setIsLoading(false);
        setMood(null);
      }
    }
    getMood();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <MoodError error={error} />;

  if (mood) return <MoodComponent mood={mood} />;

  console.error("Something has gone wrong with MoodComponent", {
    mood,
    error,
    isLoading,
  });
  return (
    <div>
      Something has gone wrong with MoodComponent. Check console for details.
    </div>
  );
}

interface MoodComponentProps {
  mood: Mood;
}

function MoodComponent(props: MoodComponentProps) {
  return (
    <div>
      <div>{props.mood.mood}</div>
      <div>{props.mood.notes}</div>
    </div>
  );
}

interface MoodErrorProps {
  error: string;
}

function MoodError(props: MoodErrorProps) {
  return <div>{props.error}</div>;
}
