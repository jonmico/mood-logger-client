import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

interface FormState {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: FormState = {
  email: "",
  firstName: "",
  password: "",
  confirmPassword: "",
};

const initialFormError: FormState = {
  email: "",
  firstName: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [serverError, setServerError] = useState("");
  const [formError, setFormError] = useState(initialFormError);
  const [isLoading, setIsLoading] = useState(false);
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  function handleFormStateChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => {
      return { ...prevState, [evt.target.name]: evt.target.value };
    });
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const errors = {
      email: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    };

    if (formState.email.trim() === "" || !formState.email.includes("@")) {
      errors.email = "Please enter a valid email.";
    }

    if (formState.firstName.trim() === "") {
      errors.firstName = "Please enter your first name.";
    }

    if (formState.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = "Passwords must match.";
    }

    setFormError(errors);

    if (
      errors.email ||
      errors.firstName ||
      errors.password ||
      errors.confirmPassword
    )
      return;

    setIsLoading(true);
    const data = await register(
      formState.email,
      formState.firstName,
      formState.password,
    );

    if (data) {
      setServerError(data.error);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerFormContainer}>
        <h1>Register</h1>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          {serverError && <div className={styles.error}>{serverError}</div>}
          <div className={styles.formInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              disabled={isLoading}
              name="email"
              id="email"
              placeholder="Enter your email."
              onChange={handleFormStateChange}
            />
            {formError.email && (
              <div className={styles.error}>{formError.email}</div>
            )}
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="firstName">First Name</label>
            <input
              disabled={isLoading}
              name="firstName"
              id="firstName"
              placeholder="Enter your first name."
              onChange={handleFormStateChange}
            />
            {formError.firstName && (
              <div className={styles.error}>{formError.firstName}</div>
            )}
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="password">Password</label>
            <input
              disabled={isLoading}
              type="password"
              id="password"
              name="password"
              placeholder="Something secure."
              onChange={handleFormStateChange}
            />
            {formError.password && (
              <div className={styles.error}>{formError.password}</div>
            )}
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              disabled={isLoading}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Can you type it securely again?"
              onChange={handleFormStateChange}
            />
            {formError.confirmPassword && (
              <div className={styles.error}>{formError.confirmPassword}</div>
            )}
          </div>
          <button disabled={isLoading} className={styles.button} type="submit">
            {isLoading ? <Loader2 className={styles.spinner} /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
