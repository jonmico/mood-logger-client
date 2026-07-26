import { useEffect, useState } from "react";
import type { Mood } from "../types/mood";
import { useNavigate, useParams } from "react-router";
import { apiGetMood } from "../services/moods/apiGetMood";
import { apiDeleteMood } from "../services/moods/apiDeleteMood";

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

// TODO: Add confirmation modal for deleting moods.
function MoodComponent(props: MoodComponentProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    setError("");
    setIsLoading(true);
    const result = await apiDeleteMood(props.mood.id);

    if (result.ok === false) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    return navigate("/moods");
  }
  return (
    <div>
      <div>{error}</div>
      <div>{props.mood.mood}</div>
      <div>{props.mood.notes}</div>
      <button disabled={isLoading} onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

interface MoodErrorProps {
  error: string;
}

function MoodError(props: MoodErrorProps) {
  return <div>{props.error}</div>;
}
