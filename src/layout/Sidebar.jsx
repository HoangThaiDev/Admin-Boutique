// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import File CSS
import "./css/sidebar.css";

// Import Icons
import { BiHome } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

// Import Component
import { Menu } from "antd";

// Crete + use navbar Category from Ant-design
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    "Dashboard",
    "dashboard",
    <BiHome className="icon-home icon-title" />,
    [
      getItem("Home", "home", <BsDot className="icon-dot" />, null),
      getItem("Orders", "orders", <BsDot className="icon-dot" />, null),
      getItem("Products", "products", <BsDot className="icon-dot" />, null),
    ]
  ),
  getItem("Admin", "admin", <FaRegUser className="icon-user icon-title" />, [
    getItem("Permission", "permission", <BsDot className="icon-dot" />, null),
    getItem(
      "Setting Accounts",
      "setting-accounts",
      <BsDot className="icon-dot" />,
      null
    ),
  ]),
];

export default function Sidebar() {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use states
  const sidebar = useSelector((state) => state.sidebar);

  // Create + use event Handles
  const choosePageHandle = (e) => {
    const pageValue = e.key;
    const pathsOfDashboard = ["orders", "products"];
    const pathsOfAdmin = ["permission", "setting-accounts"];

    if (pageValue === "home") {
      return navigate("../dashboard");
    }

    if (pathsOfDashboard.includes(pageValue)) {
      return navigate(pageValue);
    }

    if (pathsOfAdmin.includes(pageValue)) {
      return navigate(`../admin/${pageValue}`);
    }
  };

  return (
    <div className="sidabar-container">
      <Menu
        className={sidebar.isShow ? "menu-shop menu-shop-hide" : "menu-shop"}
        onClick={choosePageHandle}
        defaultSelectedKeys={["apple"]}
        defaultOpenKeys={["dashboard", "admin"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
