// Import Modules
import React from "react";
import { Outlet } from "react-router-dom";

// Import File CSS
import classes from "./css/rootLayout.module.css";

// Import Components
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className={classes["root-layout"]}>
      <div className={classes["root-layout-container"]}>
        <div className={classes["root-layout-nav"]}>
          <Navigation />
        </div>
        <div className={classes["root-layout-sidebar"]}>
          <Sidebar />
        </div>
        <div className={classes["root-layout-main"]}>
          <Outlet />
          <div className={classes["root-layout-footer"]}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
