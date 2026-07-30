import styles from "./NotesTextArea.module.css";

interface NotesTextAreaProps {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

export default function NotesTextArea(props: NotesTextAreaProps) {
  return (
    <div className={styles.textAreaWrapper}>
      <label htmlFor="notes">Notes</label>
      <textarea
        rows={5}
        id="notes"
        name="notes"
        value={props.notes}
        onChange={(evt) => props.setNotes(evt.target.value)}
      />
    </div>
  );
}
