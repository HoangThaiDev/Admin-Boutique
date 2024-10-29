// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/navigation.module.css";

// Import Icons
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { HiMiniCreditCard } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

// Import Components
import avatar from "../assets/images/avatar.svg";

export default function Navigation() {
  // Create + use States
  const [isShowMenuUserDd, setIsShowMenuUserDd] = useState(false);

  // Create + user event handles
  const showMenuUserDdHandle = () => {
    setIsShowMenuUserDd(!isShowMenuUserDd);
  };
  return (
    <div className={classes["nav"]}>
      <div className={classes["nav-container"]}>
        <div className={classes["nav-row"]}>
          {/* JSX: ------------- Nav Col Left ----------------- */}
          <div className={`${classes["nav-col"]} ${classes["nav-col-left"]}`}>
            <div className={classes["nav-logo"]}>
              <IoMenu
                className={`${classes["icon"]} ${classes["icon-menu"]}`}
              />
              <h1 className={classes["logo-name"]}>
                <span>B</span>outique
              </h1>
            </div>
          </div>

          {/* JSX: ------------- Nav Col Right ----------------- */}
          <div className={`${classes["nav-col"]} ${classes["nav-col-right"]}`}>
            <div className={classes["nav-actions"]}>
              <IoSearch
                className={`${classes["icon"]} ${classes["icon-search"]}`}
              />
              <MdSettings
                className={`${classes["icon"]} ${classes["icon-setting"]}`}
              />
              <IoIosNotifications
                className={`${classes["icon"]} ${classes["icon-noti"]}`}
              />
              <div
                className={classes["nav-user-auth"]}
                onClick={showMenuUserDdHandle}
              >
                <img
                  className={classes["user-avatar"]}
                  src={avatar}
                  alt={avatar}
                  loading="lazy"
                />
                <span className={classes["user-online-status"]}></span>

                {/* JSX: ------------ Menu User Dropdown ----------------- */}
                <ul
                  className={
                    isShowMenuUserDd
                      ? `${classes["menu-user-dropdown"]} ${classes["active"]}`
                      : classes["menu-user-dropdown"]
                  }
                >
                  <li>
                    <FaUser
                      className={`${classes["icon-menu-dropdown"]} ${classes["icon-user-dropdown"]}`}
                    />
                    <span>Profile</span>
                  </li>
                  <li>
                    <HiMiniCreditCard
                      className={`${classes["icon-menu-dropdown"]} ${classes["icon-credit-dropdown"]}`}
                    />
                    <span>My Balance</span>
                  </li>
                  <li>
                    <MdEmail
                      className={`${classes["icon-menu-dropdown"]} ${classes["icon-mail-dropdown"]}`}
                    />
                    <span>Inbox</span>
                  </li>
                  <li>
                    <MdSettings
                      className={`${classes["icon-menu-dropdown"]} ${classes["icon-setting-dropdown"]}`}
                    />
                    <span>Settings</span>
                  </li>
                  <li className={classes["divider"]}></li>
                  <li>
                    <AiOutlineLogout
                      className={`${classes["icon-menu-dropdown"]} ${classes["icon-logout-dropdown"]}`}
                    />
                    <span>Log Out</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}