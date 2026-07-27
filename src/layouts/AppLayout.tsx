import { Outlet } from "react-router";
import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.appLayoutContainer}>
      <AppNav />
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
}
