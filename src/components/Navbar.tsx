import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <NavLink to="/">Mood Logger</NavLink>
      </div>
      <div className={styles.auth}>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
}
