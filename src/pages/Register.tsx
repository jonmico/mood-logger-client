import { useState } from "react";
import styles from "./Register.module.css";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  console.log(formState);

  function handleFormStateChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState();
  }
  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerFormContainer}>
        <h1>Register</h1>
        <form className={styles.registerForm}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="something"
              onChange={handleFormStateChange}
            />
          </div>
          <input type="text" placeholder="something" />
          <input type="text" placeholder="something" />
          <button>Click me :)</button>
        </form>
      </div>
    </div>
  );
}
