// Import Modules
import React, { useState, useTransition } from "react";
import convertMoney from "../../helper/convertMoney";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Item from "./Item";
import CustomPagination from "../../UI/Pagination";

export default function Layout({ checkouts: checkoutsAPI }) {
  // Create + use Hooks
  const [isPending, startTransition] = useTransition();

  // Create + use array DUMMY
  const DUMMY_HEADER_ORDERS = [
    { id: "hd1", label: "ID Order", className: "order-id" },
    { id: "hd2", label: "Name", className: "name" },
    { id: "hd3", label: "Phone", className: "phone" },
    { id: "hd4", label: "Address", className: "address" },
    { id: "hd5", label: "Total", className: "total" },
    { id: "hd6", label: "Delivery", className: "delivery" },
    { id: "hd7", label: "Status", className: "status" },
    { id: "hd8", label: "Detail", className: "detail" },
  ];

  // Create + use States
  const [checkouts, setCheckouts] = useState(checkoutsAPI.slice(0, 8));
  const [totalCheckouts, setTotalCheckouts] = useState(checkoutsAPI.length);

  // Create + use event handles
  const showCheckoutsByPageHandle = async (currentPage) => {
    try {
      const res = await APIServer.checkout.getOrdersByPage(currentPage);
      if (res.status === 200) {
        const { checkouts, totalCheckouts } = res.data;
        const modifiedCheckouts = checkouts.map((checkout) => {
          checkout.cart.totalPrice = convertMoney(checkout.cart.totalPrice);
          return checkout;
        });

        setTotalCheckouts(totalCheckouts);
        setCheckouts(modifiedCheckouts);
      }
    } catch (error) {
      console.log(error);

      const { data } = error.response;
      alert(data.message);
    }
  };

  const searchOrderHandle = (e) => {
    const orderIdValue = e.target.value;
    const cloneCheckouts = checkoutsAPI;
    let newCheckouts = [];
    if (orderIdValue.length > 0) {
      newCheckouts = cloneCheckouts.filter((checkout) =>
        checkout._id.includes(orderIdValue)
      );
    }

    if (orderIdValue.length === 0) {
      newCheckouts = cloneCheckouts;
    }

    startTransition(() => {
      setCheckouts(newCheckouts);
    });
  };

  return (
    <div className={classes["orders"]}>
      <div className={classes["orders-container"]}>
        <div className={classes["orders-header-message"]}>
          <h3>Orders</h3>

          <div className={classes["form-search"]}>
            <input
              type="text"
              placeholder="Enter Search OrderId!"
              onChange={searchOrderHandle}
            />
            {isPending && (
              <p className={classes["message-pending-search"]}>
                Server is searching...
              </p>
            )}
          </div>
        </div>

        <div className={classes["orders-section"]}>
          <div className={classes["orders-title"]}>
            {DUMMY_HEADER_ORDERS.map((item) => (
              <div
                key={item.id}
                className={`${classes["bg-title"]} ${classes[item.className]}`}
              >
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>

          <div className={classes["orders-list"]}>
            {checkouts.map((checkout) => (
              <Item checkout={checkout} key={checkout._id} />
            ))}
          </div>

          <CustomPagination
            onShowItemsByPage={showCheckoutsByPageHandle}
            totalItems={totalCheckouts}
          />
        </div>
      </div>
    </div>
  );
}
