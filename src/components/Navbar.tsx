import { Link, NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../hooks/useAuth";
import { CircleUserRound } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, firstName, email, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const link = isLoggedIn ? "/dashboard" : "/";

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={`${styles.link} ${styles.main}`} to={link}>
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
            {isOpen && (
              <Dropdown
                firstName={firstName}
                email={email}
                logout={handleLogout}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

interface DropdownProps {
  email: string;
  firstName: string;
  logout: () => void;
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
      <button onClick={props.logout} className={styles.dropdownLogout}>
        Logout
      </button>
    </div>
  );
}
