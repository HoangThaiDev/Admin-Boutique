// Import Modules
import { useState } from "react";

// Import Icons
import { MdOutlineMailOutline } from "react-icons/md";
import { PiLockKeyBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";

const Email = ({ classes, formik }) => {
  return (
    <div className={classes["form-input"]}>
      <input
        type="text"
        className={
          formik.touched.email && formik.errors.email
            ? `${classes["input-email"]} ${classes["input-error"]}`
            : formik.touched.email && !formik.errors.email
            ? `${classes["input-email"]} ${classes["input-success"]}`
            : classes["input-email"]
        }
        name="email"
        id="email"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <MdOutlineMailOutline
        className={
          formik.touched.email && formik.errors.email
            ? `${classes["icon-email"]} ${classes["icon-email-error"]}`
            : formik.touched.email && !formik.errors.email
            ? `${classes["icon-email"]} ${classes["icon-email-success"]}`
            : classes["icon-email"]
        }
      />
      {formik.touched.email && (
        <p className={classes["message-error"]}>{formik.errors.email}</p>
      )}
    </div>
  );
};

const Password = ({ classes, formik }) => {
  // Create + use Hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Create + use event handlers
  const togglePasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ElementIconHidePassword =
    formik.values.password.length > 0 ? (
      <PiEyeClosedBold
        className={classes["icon-password-action"]}
        onClick={togglePasswordHandler}
      />
    ) : (
      ""
    );

  const ElementIconShowPassword =
    formik.values.password.length > 0 ? (
      <PiEyeBold
        className={classes["icon-password-action"]}
        onClick={togglePasswordHandler}
      />
    ) : (
      ""
    );
  return (
    <div className={classes["form-input"]}>
      <input
        type={isShowPassword ? "text" : "password"}
        className={
          formik.touched.password && formik.errors.password
            ? `${classes["input-password"]} ${classes["input-error"]}`
            : formik.touched.password && !formik.errors.password
            ? `${classes["input-password"]} ${classes["input-success"]}`
            : classes["input-password"]
        }
        name="password"
        id="password"
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <PiLockKeyBold
        className={
          formik.touched.password && formik.errors.password
            ? `${classes["icon-password"]} ${classes["icon-password-error"]}`
            : formik.touched.password && !formik.errors.password
            ? `${classes["icon-password"]} ${classes["icon-password-success"]}`
            : classes["icon-password"]
        }
      />
      {isShowPassword ? ElementIconShowPassword : ElementIconHidePassword}
      {formik.touched.password && (
        <p className={classes["message-error"]}>{formik.errors.password}</p>
      )}
    </div>
  );
};

const Input = {
  Email: Email,
  Password: Password,
};

export default Input;
