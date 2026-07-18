import { Link } from "react-router";
import styles from "./Moods.module.css";
import { PencilSparkles } from "lucide-react";

export default function Moods() {
  return (
    <div className={styles.container}>
      <div>
        <h2>This is the Moods page!</h2>
        <div>
          <p>A bunch of nonsense.</p>
        </div>
      </div>

      <Link to={"create"} className={styles.create}>
        <PencilSparkles />
        <div>Create Mood</div>
      </Link>
    </div>
  );
}
