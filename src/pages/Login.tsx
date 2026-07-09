import { useState } from "react";
import styles from "./Login.module.css";

// TODO: Write handleSubmit function.

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginFormState, setLoginFormState] = useState<LoginFormState>(
    initialLoginFormState,
  );

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    console.log(loginFormState);
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormContainer}>
        <h1>Login</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
