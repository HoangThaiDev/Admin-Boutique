// Import Modules
import React from "react";
import { Outlet } from "react-router-dom";

// Import File CSS
import classes from "./css/rootLayout.module.css";

// Import Components
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navigation />
      <Outlet />
    </div>
  );
}
