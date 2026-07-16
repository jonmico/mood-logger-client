import { Link, NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../hooks/useAuth";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, firstName, email } = useAuth();
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
            {isOpen && <Dropdown firstName={firstName} email={email} />}
          </div>
        )}
      </div>
    </nav>
  );
}

interface DropdownProps {
  email: string;
  firstName: string;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className={styles.dropdown} onClick={(evt) => evt.stopPropagation()}>
      <div className={styles.dropdownUserEmail}>
        <div>{props.firstName}</div>
        <div>{props.email}</div>
      </div>
      <div>
        <nav className={styles.dropdownNav}>
          <ul>
            <li>My Moods</li>
            <li>Edit Profile</li>
            <li>Settings</li>
          </ul>
        </nav>
      </div>
      <div className={styles.dropdownLogout}>Logout</div>
    </div>
  );
}
