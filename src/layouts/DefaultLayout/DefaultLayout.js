import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";

function DefaultLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
