import { useState } from "react";
import { useNavigate } from "react-router";
import MoodPicker from "../components/MoodPicker";
import { useAuth } from "../hooks/useAuth";
import { apiCreateMood } from "../services/moods/apiCreateMood";
import styles from "./CreateMood.module.css";

export default function CreateMood() {
  const [mood, setMood] = useState<null | number>(null);
  const [text, setText] = useState("");
  const [moodError, setMoodError] = useState("");
  const { firstName } = useAuth();
  const navigate = useNavigate();

  function handleClick(num: number) {
    if (moodError) {
      setMoodError("");
    }

    setMood(num);
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!mood) {
      setMoodError("Please select an emoji.");
      return;
    }

    const submitData = await apiCreateMood(mood, text);

    if (submitData.ok) {
      return navigate("/dashboard");
    }
  }

  return (
    <div className={styles.createMoodContainer}>
      <h1>How are you feeling, {firstName}? </h1>
      <form onSubmit={handleSubmit} className={styles.createMoodFormWrapper}>
        <div className={styles.emojiWrapper}>
          <MoodPicker mood={mood} handleClick={handleClick} />
          {moodError && <div className={styles.error}>{moodError}</div>}
        </div>
        <div className={styles.textAreaWrapper}>
          <label htmlFor="notes">Notes</label>
          <textarea
            rows={5}
            id="notes"
            name="notes"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          />
        </div>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
