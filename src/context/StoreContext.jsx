// Import Modules
import React, { createContext, useEffect, useState } from "react";
import APIServer from "../API/customAPI";

// Create Context (Hook)
const APIContext = createContext();

export default function ContextProvider({ children }) {
  // Create + use States
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Get API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await APIServer.shop.getProducts();

        if (res.status === 200) {
          const products = res.data;

          setProducts(products);
          setIsLoading(true);
        }
      } catch (error) {
        console.log("API Context Error:", error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  return (
    <>
      {isLoading && (
        <APIContext.Provider value={{ products: products }}>
          {children}
        </APIContext.Provider>
      )}
    </>
  );
}

export { APIContext };
