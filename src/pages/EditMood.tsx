import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiGetMood } from "../services/moods/apiGetMood";
import MoodPicker from "../components/MoodPicker";
import { apiEditMood } from "../services/moods/apiEditMood";

export default function EditMood() {
  const [notes, setNotes] = useState("");
  const [mood, setMood] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMood() {
      const result = await apiGetMood(params.id);

      if (result.ok) {
        setNotes(result.mood.notes);
        setMood(result.mood.mood);
        setIsLoading(false);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }
    getMood();
  }, [params.id]);

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!mood) {
      return;
    }

    const result = await apiEditMood(params.id, mood, notes);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate(`/moods/${params.id}`);
  }

  function handleClick(num: number) {
    setMood(num);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Edit mood</div>
      <form onSubmit={handleSubmit}>
        <div>
          <MoodPicker mood={mood} handleClick={handleClick} />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(evt) => setNotes(evt.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
