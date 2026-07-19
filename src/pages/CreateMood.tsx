import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./CreateMood.module.css";

export default function CreateMood() {
  const [mood, setMood] = useState<null | number>(null);
  const [text, setText] = useState("");
  const { firstName } = useAuth();

  function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <div className={styles.createMoodContainer}>
      <h1>How are you feeling, {firstName}? </h1>
      <form onSubmit={handleSubmit} className={styles.createMoodFormWrapper}>
        <div className={styles.emojiWrapper}>
          <EmojiButton mood={mood} moodValue={1} setMood={setMood}>
            {"😄"}
          </EmojiButton>
          <EmojiButton mood={mood} moodValue={2} setMood={setMood}>
            {"🙂"}
          </EmojiButton>
          <EmojiButton mood={mood} moodValue={3} setMood={setMood}>
            {"😐"}
          </EmojiButton>
          <EmojiButton mood={mood} moodValue={4} setMood={setMood}>
            {"😞"}
          </EmojiButton>
          <EmojiButton mood={mood} moodValue={5} setMood={setMood}>
            {"😭"}
          </EmojiButton>
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
  setMood: React.Dispatch<React.SetStateAction<number | null>>;
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
      onClick={() => props.setMood(props.moodValue)}
    >
      {props.children}
    </button>
  );
}
