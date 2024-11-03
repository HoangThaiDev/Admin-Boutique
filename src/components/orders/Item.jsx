// Import Modules
import React from "react";
import { useDispatch } from "react-redux";
import { actionModalCheckout } from "../../redux/actionRedux";

// Import File CSS
import classes from "./css/item.module.css";

export default function Item({ checkout }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use event handles
  const viewCheckoutDetailHandle = (checkout) => {
    dispatch(actionModalCheckout.show(checkout));
  };

  return (
    <div className={classes["order-item"]}>
      <div className={`${classes["bg-content"]} ${classes["order-id"]}`}>
        <p>{checkout._id}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["name"]}`}>
        <p>{checkout.info_client.fullname}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["phone"]}`}>
        <p>{checkout.info_client.phone}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["address"]}`}>
        <p>{checkout.info_client.address}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["price"]}`}>
        <p>{checkout.cart.totalPrice} VND</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["delivery"]}`}>
        <p>{checkout.state.delivery}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["status"]}`}>
        <p>{checkout.state.status}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["detail"]}`}>
        <button
          type="button"
          className={classes["btn-view"]}
          onClick={() => viewCheckoutDetailHandle(checkout)}
        >
          View
        </button>
      </div>
    </div>
  );
}
