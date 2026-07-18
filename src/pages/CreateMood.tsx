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
    <div>
      <h1>How are you feeling, {firstName}? </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" onClick={() => setMood(1)}>
            {"😄"}
          </button>
          <button type="button" onClick={() => setMood(2)}>
            {"🙂"}
          </button>
          <button type="button" onClick={() => setMood(3)}>
            {"😐"}
          </button>
          <button type="button" onClick={() => setMood(4)}>
            {"😞"}
          </button>
          <button type="button" onClick={() => setMood(5)}>
            {"😭"}
          </button>
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
