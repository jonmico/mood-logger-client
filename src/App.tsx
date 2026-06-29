import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
