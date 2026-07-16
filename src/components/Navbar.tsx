import { Link, NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../hooks/useAuth";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, firstName } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={`${styles.link} ${styles.main}`} to="/">
          Mood Logger
        </Link>
      </div>
      <div className={styles.auth}>
        {!isLoggedIn ? (
          <>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
            <NavLink className={styles.link} to="/register">
              Register
            </NavLink>
          </>
        ) : (
          <div className={styles.user} onClick={handleClick}>
            <CircleUserRound />
            {isOpen && <DropDown />}
          </div>
        )}
      </div>
    </nav>
  );
}

function DropDown() {
  return <div onClick={(evt) => evt.stopPropagation()}></div>;
}
