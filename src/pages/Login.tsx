import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../hooks/useAuth";

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
};

// TODO: Style error message.
// TODO: Style form being disabled when submitting.
// TODO: Finally make a spinner for the Login button.

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormState, setLoginFormState] = useState<LoginFormState>(
    initialLoginFormState,
  );
  const [loginFormError, setLoginFormError] = useState("");

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    setIsLoading(true);
    // FIXME: Remove this after styling is done.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await login(loginFormState.email, loginFormState.password);

    if (data) {
      setLoginFormError(data.message);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormContainer}>
        <h1>Login</h1>
        {loginFormError && <div>{loginFormError}</div>}
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
          <button disabled={isLoading} type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
