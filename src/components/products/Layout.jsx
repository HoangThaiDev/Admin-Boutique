// Import Modules
import React, { useContext, useState, useTransition } from "react";
import { APIContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionModalFormProduct } from "../../redux/actionRedux";
import convertMoney from "../../helper/convertMoney";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Item from "./Item";
import CustomPagination from "../../UI/Pagination";

export default function Layout() {
  // Create + use Hooks
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use array DUMMY
  const DUMMY_HEADER_CART = [
    { id: "hd1", label: "ID", className: "id" },
    { id: "hd2", label: "Name", className: "name" },
    { id: "hd3", label: "Price", className: "price" },
    { id: "hd4", label: "Image", className: "image" },
    { id: "hd5", label: "Category", className: "category" },
    { id: "hd6", label: "Edit", className: "edit" },
  ];

  // Create + use data (API Context)
  const dataContext = useContext(APIContext);

  // Create + use States
  const [products, setProducts] = useState(dataContext.products.slice(0, 8));
  const [totalProducts, setTotalProducts] = useState(
    dataContext.products.length
  );

  // Create + use event handles
  const showProductsByPageHandle = async (currentPage) => {
    try {
      const res = await APIServer.shop.getProductsByPage(currentPage);
      if (res.status === 200) {
        const { products, totalProducts } = res.data;
        const modifiedProducts = products.map((product) => {
          product.price = convertMoney(product.price);
          return product;
        });

        setTotalProducts(totalProducts);
        setProducts(modifiedProducts);
      }
    } catch (error) {
      console.log(error);

      const { data } = error.response;
      alert(data.message);
    }
  };

  const searchProductHandle = (e) => {
    const nameValue = e.target.value;
    const cloneProducts = dataContext.products;
    let newProducts = [];
    if (nameValue.length > 0) {
      newProducts = cloneProducts.filter((product) =>
        product.name.includes(nameValue)
      );
    }

    if (nameValue.length === 0) {
      newProducts = cloneProducts;
    }

    startTransition(() => {
      setProducts(newProducts);
    });
  };

  const showModalProductHandle = () => {
    navigate("?mode=add");
    dispatch(actionModalFormProduct.add());
  };

  return (
    <div className={classes["products"]}>
      <div className={classes["products-container"]}>
        <div className={classes["products-header-message"]}>
          <h3>Products</h3>

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
            <button
              type="button"
              className={classes["btn-add"]}
              onClick={showModalProductHandle}
            >
              New product
            </button>
          </div>
        </div>

        <div className={classes["products-section"]}>
          <div className={classes["products-title"]}>
            {DUMMY_HEADER_CART.map((item) => (
              <div
                key={item.id}
                className={`${classes["bg-title"]} ${classes[item.className]}`}
              >
                <h4>{item.label}</h4>
              </div>
            ))}
          </div>
          {products.length > 0 && (
            <div className={classes["products-list"]}>
              {products.map((product) => (
                <Item product={product} key={product._id} />
              ))}
            </div>
          )}
          <CustomPagination
            onShowItemsByPage={showProductsByPageHandle}
            totalItems={totalProducts}
          />
        </div>
      </div>
    </div>
  );
}
