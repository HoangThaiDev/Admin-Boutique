// Import Modules
import React, { useEffect, useState } from "react";
import APIServer from "../../API/customAPI";
import convertMoney from "../../helper/convertMoney";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/header.module.css";

// Import Icons
import { FiUserPlus } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { FiFilePlus } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";

export default function header() {
  // Create + use States
  const [checkouts, setCheckout] = useState({
    checkout: [],
    totalPriceCheckouts: "",
    clients: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  // Side Effects
  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const res = await APIServer.checkout.getCheckouts();
        if (res.status === 200) {
          const checkouts = res.data;

          // Calculate total price all order
          const totalPrice = convertMoney(
            checkouts.reduce((acc, cur) => {
              return acc + parseInt(cur.cart.totalPrice);
            }, 0)
          );

          // Get amount users
          const clients = [
            ...new Set(checkouts.map((checkout) => checkout.user.toString())),
          ];

          setCheckout((prevState) => ({
            ...prevState,
            totalPriceCheckouts: totalPrice,
            checkout: checkouts,
            clients: clients.length,
          }));
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
        const { data } = error.response;
        alert(data.message);
        setIsLoading(false);
      }
    };
    fetchCheckouts();
  }, []);

  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <div className={classes["header-message"]}>
          <h3>Good Morning, {user.role === "client" ? "Client" : "Admin"}!</h3>
          {user.role === "client" ? (
            <p>Welcome to my DashBoard website Boutique!</p>
          ) : (
            <p>Here's what's happening with your store today.</p>
          )}
        </div>
        {isLoading && (
          <div className={classes["header-row"]}>
            <div className={classes["header-col"]}>
              <div
                className={`${classes["info-value"]} ${classes["info-value-clients"]}`}
              >
                <p>{checkouts.clients}</p>
                <span>Clients</span>
              </div>
              <FiUserPlus
                className={`${classes["icon"]} ${classes["icon-new-client"]}`}
              />
            </div>
            <div className={classes["header-col"]}>
              <div
                className={`${classes["info-value"]} ${classes["info-value-prices"]}`}
              >
                <p>{checkouts.totalPriceCheckouts}</p>
                <span>Earnings</span>
              </div>
              <MdAttachMoney
                className={`${classes["icon"]} ${classes["icon-price"]}`}
              />
            </div>
            <div className={classes["header-col"]}>
              <div
                className={`${classes["info-value"]} ${classes["info-value-orders"]}`}
              >
                <p>{checkouts.checkout.length}</p>
                <span>New Order</span>
              </div>
              <RiShoppingBagLine
                className={`${classes["icon"]} ${classes["icon-order"]}`}
              />
            </div>
            <div className={classes["header-col"]}>
              <div
                className={`${classes["info-value"]} ${classes["info-value-balance"]}`}
              >
                <p>{checkouts.totalPriceCheckouts}</p>
                <span>My Balance</span>
              </div>
              <FiFilePlus
                className={`${classes["icon"]} ${classes["icon-balance"]}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
