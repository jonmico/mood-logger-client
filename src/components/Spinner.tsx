import { Loader2 } from "lucide-react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  fullPage?: boolean;
}

export default function Spinner(props: SpinnerProps) {
  if (props.fullPage) {
    return (
      <div className={styles.fullPage}>
        <Loader2 size={60} className={styles.spinner} />
      </div>
    );
  }
  return <Loader2 className={styles.spinner} />;
}
