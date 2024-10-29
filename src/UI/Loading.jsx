// Import Modules
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

// Import File CSS
import classes from "./css/loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <div className={classes["loading__container"]}>
        <div className={classes["loading__card"]}>
          <FadeLoader
            className={classes["fade-loading"]}
            color="#17355c"
            height={20}
            margin={10}
            radius={2}
            width={5}
          />
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
