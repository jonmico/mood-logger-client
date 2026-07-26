import styles from "./MoodPicker.module.css";

interface MoodPickerProps {
  mood: number | null;
  handleClick: (num: number) => void;
}

export default function MoodPicker(props: MoodPickerProps) {
  const { mood, handleClick } = props;

  return (
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
