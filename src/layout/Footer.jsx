// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/footer.module.css";

export default function Footer() {
  return (
    <div className={classes["footer-container"]}>
      <div className={classes["footer-row"]}>
        <div className={classes["footer-col-left"]}>
          <h3 className={classes["logo-name"]}>
            <span>B</span>outique
          </h3>
          <ul className={classes["bread-crum-link"]}>
            <li>Terms</li>
            <li>Services</li>
            <li>Helps</li>
          </ul>
        </div>
        <div className={classes["footer-col-right"]}>
          <p>2024 &#169; Boutique by HoangThaiDev</p>
        </div>
      </div>
    </div>
  );
}
