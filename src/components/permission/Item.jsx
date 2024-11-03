// Import Modules
import React, { useState } from "react";
import APIServer from "../../API/customAPI";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/item.module.css";

export default function Item({ admin }) {
  // Create + use States
  const [roleSelect, setRoleSelect] = useState(admin.role);
  const user = useSelector((state) => state.user);

  // Create + use event handles
  const updateAdminHandle = async (adminId) => {
    if (!user.isLoggedIn) {
      return alert("Your account is logging, you can't edit this account");
    }

    try {
      const res = await APIServer.admin.postUpdateAdmin({
        adminId,
        roleSelect,
      });

      if (res.status === 200) {
        const { message } = res.data;
        alert(message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      const { data } = error.response;
      alert(data.message);
    }
  };

  const changeRoleHandle = (e) => {
    setRoleSelect(e.target.value);
  };

  return (
    <div className={classes["product-item"]}>
      <div className={`${classes["bg-content"]} ${classes["id"]}`}>
        <p>{admin._id}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["email"]}`}>
        <p>{admin.email}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["fullname"]}`}>
        <p>{admin.fullname ? admin.fullname : "Empty"} </p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["phone"]}`}>
        <p>{admin.phone ? admin.phone : "Empty"} </p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["role"]}`}>
        <select value={roleSelect} onChange={changeRoleHandle}>
          <option value="super-admin">super-admin</option>
          <option value="admin">admin</option>
          <option value="client">client</option>
        </select>
      </div>
      <div className={`${classes["bg-content"]} ${classes["state"]}`}>
        {admin.state.isLoggedIn ? (
          <p className={classes["state-logged-in"]}>Logged in</p>
        ) : (
          <p className={classes["state-logged-out"]}>Not logged</p>
        )}
      </div>
      <div className={`${classes["bg-content"]} ${classes["edit"]}`}>
        <button
          type="button"
          className={classes["btn-edit"]}
          onClick={() => updateAdminHandle(admin._id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
