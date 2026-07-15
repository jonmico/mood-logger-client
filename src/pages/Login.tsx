import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
};

const initialLoginFormErrorsState: LoginFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormState, setLoginFormState] = useState(initialLoginFormState);
  const [loginFormErrors, setLoginFormErrors] = useState(
    initialLoginFormErrorsState,
  );
  const [loginServerError, setloginServerError] = useState("");

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const errors = { email: "", password: "" };

    if (
      loginFormState.email.trim() === "" ||
      !loginFormState.email.includes("@")
    ) {
      errors.email = "Please enter a valid email.";
    }

    if (loginFormState.password.trim() === "") {
      errors.password = "Please enter your password.";
    }

    setLoginFormErrors(errors);

    if (errors.email || errors.password) return;

    setIsLoading(true);
    const data = await login(loginFormState.email, loginFormState.password);

    if (data) {
      setloginServerError(data.message);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormContainer}>
        <h1>Login</h1>
        {loginServerError && (
          <div className={styles.error}>{loginServerError}</div>
        )}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              disabled={isLoading}
              name="email"
              id="email"
              type="email"
              onChange={handleOnChange}
            />
            {loginFormErrors.email && (
              <div className={styles.error}>{loginFormErrors.email}</div>
            )}
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="password">Password</label>

            <input
              disabled={isLoading}
              name="password"
              id="password"
              type="password"
              onChange={handleOnChange}
            />
            {loginFormErrors.password && (
              <div className={styles.error}>{loginFormErrors.password}</div>
            )}
          </div>
          <button disabled={isLoading} type="submit" className={styles.button}>
            {isLoading ? <Loader2 className={styles.spinner} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
