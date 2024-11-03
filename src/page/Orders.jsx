// Import Modules
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIServer from "../API/customAPI";
import convertMoney from "../helper/convertMoney";

// Import Components
import Layout from "../components/orders/Layout";

export default function Orders() {
  // Create + use States
  const [checkouts, setCheckouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  // Side Effects
  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const res = await APIServer.checkout.getCheckouts();
        if (res.status === 200) {
          const checkouts = res.data;

          setCheckouts(checkouts);
          setIsLoading(true);
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
        setIsLoading(false);
      }
    };
    if (user.isLoggedIn) {
      fetchCheckouts();
    }
  }, [user]);
  return <>{isLoading && <Layout checkouts={checkouts} />}</>;
}
