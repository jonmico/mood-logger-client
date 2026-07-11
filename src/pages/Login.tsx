import { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../services/auth/login";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormState((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const loginData = await login(
      loginFormState.email,
      loginFormState.password,
    );

    if (loginData.ok) return navigate("/dashboard");
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
