// Import Modules
import React, { useState, useTransition } from "react";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Item from "./Item";
import CustomPagination from "../../UI/Pagination";

export default function Layout({ admins: adminsAPI }) {
  // Create + use Hooks
  const [isPending, startTransition] = useTransition();

  // Create + use array DUMMY
  const DUMMY_HEADER_ADMIN = [
    { id: "hd1", label: "ID", className: "id" },
    { id: "hd2", label: "Email", className: "email" },
    { id: "hd3", label: "Fullname", className: "fullname" },
    { id: "hd4", label: "Phone", className: "phone" },
    { id: "hd5", label: "Role", className: "role" },
    { id: "hd6", label: "State", className: "state" },
    { id: "hd7", label: "Edit", className: "edit" },
  ];

  // Create + use States
  const [admins, setAdmins] = useState(adminsAPI.slice(0, 8));
  const [totalAdmins, setTotalAdmins] = useState(adminsAPI.length);

  // Create + use event handles
  const searchProductHandle = (e) => {
    const accountId = e.target.value;
    const cloneAdmins = adminsAPI;
    let newAdmins = [];
    if (accountId.length > 0) {
      newAdmins = cloneAdmins.filter((admin) =>
        admin._id.toString().includes(accountId)
      );
    }

    if (accountId.length === 0) {
      newAdmins = cloneAdmins;
    }

    startTransition(() => {
      setAdmins(newAdmins);
    });
  };

  const showAdminsByPageHandle = async (currentPage) => {
    try {
      const res = await APIServer.admin.getAdminsByPage(currentPage);
      if (res.status === 200) {
        const { products, totalProducts } = res.data;
        const modifiedProducts = products.map((product) => {
          product.price = convertMoney(product.price);
          return product;
        });

        setTotalAdmins(totalProducts);
        setAdmins(modifiedProducts);
      }
    } catch (error) {
      console.log(error);

      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div className={classes["admins-permission"]}>
      <div className={classes["admins-permission-container"]}>
        <div className={classes["admins-permission-header-message"]}>
          <h3>Admin / Permission</h3>

          <div className={classes["form-search"]}>
            <input
              type="text"
              placeholder="Enter Search!"
              onChange={searchProductHandle}
            />
            {isPending && (
              <p className={classes["message-pending-search"]}>
                Server is searching...
              </p>
            )}
          </div>
        </div>

        <div className={classes["admins-permission-section"]}>
          <div className={classes["admins-permission-title"]}>
            {DUMMY_HEADER_ADMIN.map((item) => (
              <div
                key={item.id}
                className={`${classes["bg-title"]} ${classes[item.className]}`}
              >
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>
          {admins.length > 0 && (
            <div className={classes["admins-permission-list"]}>
              {admins.map((admin) => (
                <Item admin={admin} key={admin._id} />
              ))}
            </div>
          )}
          <CustomPagination
            onShowItemsByPage={showAdminsByPageHandle}
            totalItems={totalAdmins}
          />
        </div>
      </div>
    </div>
  );
}
