// Import Modules
import React, { memo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/formRegister.module.css";

// Import Components
import Input from "./Input";

function FormRegister({ onShowToastify }) {
  // Create + use Schema Yup
  const schemaFormRegister = Yup.object().shape({
    email: Yup.string()
      .required("Email is required !")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|net|org)$/i,
        "Invalid Email !"
      ),
    password: Yup.string()
      .required("Password is required !")
      .min(8, "Password must be 8 characters or more !"),
    phone: Yup.string()
      .required("Phone is required !")
      .matches(/[0-9]/i, "Phone numbers must be numeric characters !")
      .min(10, "Phone must be 10 characters !")
      .max(10, "Phone must be 10 characters !"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: schemaFormRegister,
    onSubmit: async (values) => {
      try {
        const res = await APIServer.admin.postSignUpAdmin(values);

        if (res.status === 201) {
          const { message } = res.data;
          alert(message);
          navigate("..");
        }
      } catch (error) {
        const { data } = error.response;
        onShowToastify(data);
      }
    },
  });

  // Create + use Hooks
  const navigate = useNavigate();

  return (
    <form
      className={classes["form-register-container"]}
      onSubmit={formik.handleSubmit}
    >
      <div className={classes["form-register-header"]}>
        <h1 className={classes["form-register-logo"]}>
          <span>B</span>outique
        </h1>
        <h3 className={classes["form-register-title"]}>SIGN UP</h3>
      </div>

      <div className={classes["form-register-section"]}>
        <Input.Email classes={classes} formik={formik} />
        <Input.Password classes={classes} formik={formik} />
        <Input.Phone classes={classes} formik={formik} />

        <button type="submit" className={classes["btn-sign-up"]}>
          SIGN UP
        </button>
      </div>

      <div className={classes["form-register-footer"]}>
        <p className={classes["footer-title"]}>Login?</p>
        <Link to=".." className={classes["footer-link"]}>
          Click
        </Link>
      </div>
    </form>
  );
}

export default memo(FormRegister);
