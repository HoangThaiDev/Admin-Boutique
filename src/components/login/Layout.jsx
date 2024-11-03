// Import Modules
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import FormLogin from "./FormLogin";
import Toastify from "../../UI/Toastify";

// Import Images
import bannerImage from "../../assets/images/banner1.jpg";
import Image1 from "../../assets/images/image1.jpg";

export default function Layout() {
  // Create + use event handles
  const showToastifyHandle = useCallback((data) => {
    toast.error(data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "toast-login-error",
    });
  }, []);

  return (
    <div className={classes["login"]}>
      <Toastify bodyClassName="toast-body-login" position="top-right" />
      <img
        className={classes["login-background"]}
        src={bannerImage}
        alt={bannerImage}
        loading="lazy"
      />
      <div className={classes["login-container"]}>
        <div className={classes["login-banner"]}>
          <img
            className={classes["login-background"]}
            src={Image1}
            alt={Image1}
            loading="lazy"
          />
        </div>
        <div className={classes["login-form"]}>
          <FormLogin onShowToastify={showToastifyHandle} />
        </div>
      </div>
    </div>
  );
}
