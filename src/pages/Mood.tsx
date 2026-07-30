import { useEffect, useState } from "react";
import type { Mood } from "../types/mood";
import { Link, useNavigate, useParams } from "react-router";
import { apiGetMood } from "../services/moods/apiGetMood";
import { apiDeleteMood } from "../services/moods/apiDeleteMood";
import { getMoodEmoji } from "../utils/getMoodEmoji";
import styles from "./Mood.module.css";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Spinner from "../components/Spinner";
import NotesDisplay from "../components/NotesDisplay";

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

  if (isLoading) return <Spinner fullPage={true} />;

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
    <div className={styles.moodWrapper}>
      {error && <div>{error}</div>}
      <h2 className={styles.moodDate}>
        Mood from {format(new Date(props.mood.created_at), "MMMM dd, yyyy")}
      </h2>
      <div className={styles.moodRating}>
        <div>Mood Rating:</div>
        <div className={styles.emoji}>{getMoodEmoji(props.mood.mood)}</div>
      </div>
      <div>
        <div className={styles.notesHeader}>Notes:</div>
        <NotesDisplay notes={props.mood.notes} />
      </div>
      <div className={styles.buttonLinkWrapper}>
        <button
          className={styles.deleteButton}
          disabled={isLoading}
          onClick={handleClick}
        >
          <div>
            <Trash2 />
          </div>
          <div>Delete Mood</div>
        </button>
        <Link className={styles.editLink} to={`/moods/${props.mood.id}/edit`}>
          <div>
            <Pencil />
          </div>
          <div>Edit Mood</div>
        </Link>
      </div>
    </div>
  );
}

interface MoodErrorProps {
  error: string;
}

function MoodError(props: MoodErrorProps) {
  return <div>{props.error}</div>;
}
