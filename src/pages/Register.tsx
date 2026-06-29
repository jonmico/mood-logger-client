import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerFormContainer}>
        <h1>Register</h1>
        <form className={styles.registerForm}>
          <input type="text" placeholder="something" />
          <input type="text" placeholder="something" />
          <input type="text" placeholder="something" />
          <button>Click me :)</button>
        </form>
      </div>
    </div>
  );
}
