// Import Modules
import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionModalCheckout } from "../redux/actionRedux";
import convertMoney from "../helper/convertMoney";

// Import File CSS
import classes from "./css/checkoutDetail.module.css";

// Import Icons
import { IoClose } from "react-icons/io5";

// Import Components
import Overlay from "./Overlay";

function CheckoutDetail({ isShow, cart, onClose }) {
  // Create + use array DUMMY
  const DUMMY_HEADER_CART = [
    { id: "hd1", label: "ID", className: "id" },
    { id: "hd2", label: "Name", className: "name" },
    { id: "hd3", label: "Price", className: "price" },
    { id: "hd4", label: "Image", className: "image" },
    { id: "hd5", label: "Category", className: "category" },
  ];

  return (
    <div
      className={
        isShow
          ? `${classes["modal-checkout"]} ${classes["active"]}`
          : classes["modal-checkout"]
      }
    >
      <div className={classes["modal-checkout-container"]}>
        <h1>CART DETAIL</h1>
        <IoClose className={classes["icon-close"]} onClick={onClose} />
        <div className={classes["checkout-cart-header"]}>
          {DUMMY_HEADER_CART.map((item) => (
            <div
              key={item.id}
              className={`${classes["bg-title"]} ${classes[item.className]}`}
            >
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
        <div className={classes["checkout-cart-content"]}>
          {cart.items.map((item) => (
            <div key={item.itemId} className={classes["product-item"]}>
              <div className={`${classes["bg-content"]} ${classes["id"]}`}>
                <p>{item.itemId._id}</p>
              </div>
              <div className={`${classes["bg-content"]} ${classes["name"]}`}>
                <p>{item.itemId.name}</p>
              </div>
              <div className={`${classes["bg-content"]} ${classes["price"]}`}>
                <p>{convertMoney(item.itemId.price)} </p>
                <span>VND</span>
              </div>
              <div className={`${classes["bg-content"]} ${classes["image"]}`}>
                <img
                  src={item.itemId.images[0]}
                  alt={item.itemId.images[0]}
                  loading="lazy"
                />
              </div>
              <div
                className={`${classes["bg-content"]} ${classes["category"]}`}
              >
                <p>{item.itemId.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ModalCheckout() {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use States
  const checkout = useSelector((state) => state.modalCheckout);

  // Create + use event handles
  const closeModalHandle = () => {
    dispatch(actionModalCheckout.hide());
  };
  return (
    <>
      {checkout.cart &&
        createPortal(
          <CheckoutDetail
            cart={checkout.cart}
            isShow={checkout.isShow}
            onClose={closeModalHandle}
          />,
          document.getElementById("modal-checkout")
        )}
      <Overlay isShow={checkout.isShow} onClose={closeModalHandle} />
    </>
  );
}
