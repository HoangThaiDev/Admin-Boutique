// Import Modules
import React, { useCallback } from "react";
import { toast } from "react-toastify";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import FormRegister from "./FormRegister";
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
      className: "toast-register-error",
    });
  }, []);

  return (
    <div className={classes["register"]}>
      <Toastify bodyClassName="toast-body-register" position="top-right" />
      <img
        className={classes["register-background"]}
        src={bannerImage}
        alt={bannerImage}
        loading="lazy"
      />
      <div className={classes["register-container"]}>
        <div className={classes["register-banner"]}>
          <img
            className={classes["register-background"]}
            src={Image1}
            alt={Image1}
            loading="lazy"
          />
        </div>
        <div className={classes["register-form"]}>
          <FormRegister onShowToastify={showToastifyHandle} />
        </div>
      </div>
    </div>
  );
}
