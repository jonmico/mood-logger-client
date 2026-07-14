import { useState } from "react";
import styles from "./Register.module.css";
import { useAuth } from "../hooks/useAuth";

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
  const { register } = useAuth();

  function handleFormStateChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => {
      return { ...prevState, [evt.target.name]: evt.target.value };
    });
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();
    // TODO: Handle what data returns.
    const data = await register(formState.email, formState.password);
  }

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerFormContainer}>
        <h1>Register</h1>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              placeholder="Enter your email."
              onChange={handleFormStateChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Something secure."
              onChange={handleFormStateChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Can you type it securely again?"
              onChange={handleFormStateChange}
            />
          </div>
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
