import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./CreateMood.module.css";
import { apiCreateMood } from "../services/moods/apiCreateMood";
import { useNavigate } from "react-router";

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

    // TODO: Add better validation.
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
          <div className={styles.emojiButtonWrapper}>
            <EmojiButton mood={mood} moodValue={1} handleClick={handleClick}>
              {"😄"}
            </EmojiButton>
            <EmojiButton mood={mood} moodValue={2} handleClick={handleClick}>
              {"🙂"}
            </EmojiButton>
            <EmojiButton mood={mood} moodValue={3} handleClick={handleClick}>
              {"😐"}
            </EmojiButton>
            <EmojiButton mood={mood} moodValue={4} handleClick={handleClick}>
              {"😞"}
            </EmojiButton>
            <EmojiButton mood={mood} moodValue={5} handleClick={handleClick}>
              {"😭"}
            </EmojiButton>
          </div>
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

interface EmojiButtonProps {
  children: React.ReactNode;
  handleClick: (num: number) => void;
  moodValue: number;
  mood: number | null;
}

function EmojiButton(props: EmojiButtonProps) {
  const isActive = props.mood === props.moodValue;

  return (
    <button
      className={
        isActive ? `${styles.emojiButton} ${styles.active}` : styles.emojiButton
      }
      type="button"
      onClick={() => props.handleClick(props.moodValue)}
    >
      {props.children}
    </button>
  );
}
