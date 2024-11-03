// Import Modules
import React, { memo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "../../API/customAPI";
import { actionUser } from "../../redux/actionRedux";

// Import File CSS
import classes from "./css/formLogin.module.css";

// Import Components
import Input from "./Input";

function FormLogin({ onShowToastify }) {
  // Create + use Schema Yup
  const schemaFormLogin = Yup.object().shape({
    email: Yup.string()
      .required("Email is required !")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|net|org)$/i,
        "Invalid Email !"
      ),
    password: Yup.string()
      .required("Password is required !")
      .min(8, "Password must be 8 characters or more !"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaFormLogin,
    onSubmit: async (values) => {
      try {
        const res = await APIServer.admin.postLoginAdmin(values);

        if (res.status === 200) {
          const { message, accessToken, isLoggedIn, role } = res.data;

          alert(message);
          //  Update state: User
          dispatch(actionUser.save({ accessToken, isLoggedIn, role }));
          navigate("/dashboard");
          return false;
        }
      } catch (error) {
        const { data } = error.response;
        onShowToastify(data);
      }
    },
  });

  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <form
      className={classes["form-login-container"]}
      onSubmit={formik.handleSubmit}
    >
      <div className={classes["form-login-header"]}>
        <h1 className={classes["form-login-logo"]}>
          <span>B</span>outique
        </h1>
        <h3 className={classes["form-login-title"]}>SIGN IN</h3>
      </div>

      <div className={classes["form-login-section"]}>
        <Input.Email classes={classes} formik={formik} />
        <Input.Password classes={classes} formik={formik} />
        <button type="submit" className={classes["btn-sign-in"]}>
          SIGN IN
        </button>
      </div>

      <div className={classes["form-login-footer"]}>
        <p className={classes["footer-title"]}>Create an account?</p>
        <Link to="/signup" className={classes["footer-link"]}>
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default memo(FormLogin);
