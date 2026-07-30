import styles from "./NotesDisplay.module.css";

interface NotesDisplayProps {
  notes: string;
}

export default function NotesDisplay(props: NotesDisplayProps) {
  return (
    <div className={styles.notesDisplay}>
      {props.notes === "" ? (
        <div className={styles.noNotesText}>
          This mood doesn't have any notes!
        </div>
      ) : (
        props.notes
      )}
    </div>
  );
}
