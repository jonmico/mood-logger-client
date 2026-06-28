import { Link, NavLink } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={`${styles.link} ${styles.main}`} to="/">
          Mood Logger
        </Link>
      </div>
      <div className={styles.auth}>
        <NavLink className={styles.link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.link} to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  );
}
