// Import Modules
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIServer from "../API/customAPI";

// Import Components
import Layout from "../components/permission/Layout";

export default function Permission() {
  // Create + use States
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  // Side Effects

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await APIServer.admin.getAdmins();
        if (res.status === 200) {
          setAdmins(res.data);
          setIsLoading(true);
        }
      } catch (error) {
        const { data } = error.respose;
        alert(data.message);
        setIsLoading(false);
      }
    };

    if (user.isLoggedIn) {
      fetchAdmins();
    }
  }, [user]);
  return <>{isLoading && <Layout admins={admins} />}</>;
}
