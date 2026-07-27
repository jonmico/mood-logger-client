import { NavLink } from "react-router";
import styles from "./AppNav.module.css";
import { ClipboardClock, LayoutDashboard, TrendingUp } from "lucide-react";

export default function AppNav() {
  return (
    <nav className={styles.appNavContainer}>
      <ul className={styles.appNavWrapper}>
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <div>
              <LayoutDashboard />
            </div>
            <div className={styles.linkText}>Dashboard</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/moods"}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <div>
              <ClipboardClock />
            </div>
            <div className={styles.linkText}>My Moods</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/chart"}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <div>
              <TrendingUp />
            </div>
            <div className={styles.linkText}>Mood Chart</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
