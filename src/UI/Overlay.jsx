// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/overlay.module.css";

function Overlay({ isShow, onClose }) {
  return (
    <>
      {isShow && (
        <div className={classes["overlay-background"]} onClick={onClose}></div>
      )}
    </>
  );
}

export default Overlay;
