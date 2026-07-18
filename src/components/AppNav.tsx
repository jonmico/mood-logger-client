import { NavLink } from "react-router";
import styles from "./AppNav.module.css";
import { ClipboardClock, LayoutDashboard, TrendingUp } from "lucide-react";

export default function AppNav() {
  return (
    <nav className={styles.container}>
      <ul className={styles.wrapper}>
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
            <div>Dashboard</div>
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
            <div>My Moods</div>
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
            <div>Mood Chart</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
