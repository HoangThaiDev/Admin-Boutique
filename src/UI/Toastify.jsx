// Import Modules
import React from "react";
import { ToastContainer } from "react-toastify";

// Import File CSS
import "react-toastify/dist/ReactToastify.css";
import "./css/toastify.css";

export default function Toastify({ position, bodyClassName, className }) {
  return (
    <ToastContainer
      position={position}
      autoClose={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="light"
      bodyClassName={bodyClassName}
      className={className}
    />
  );
}
