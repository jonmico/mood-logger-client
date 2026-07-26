import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiGetMood } from "../services/moods/apiGetMood";

interface FormState {
  mood: number | string;
  notes: string;
}

const initialFormState: FormState = {
  mood: "",
  notes: "",
};

export default function EditMood() {
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    async function getMood() {
      const result = await apiGetMood(params.id);

      if (result.ok) {
        setFormState({
          mood: result.mood.mood,
          notes: result.mood.notes,
        });
        setIsLoading(false);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }
    getMood();
  }, [params.id]);

  function handleOnChange(
    evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setFormState((prevState) => {
      return { ...prevState, [evt.target.name]: evt.target.value };
    });
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    console.log("You are submitting the form!");
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Edit mood</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mood">Mood</label>
          <input
            id="mood"
            name="mood"
            type="number"
            value={formState.mood}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formState.notes}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
