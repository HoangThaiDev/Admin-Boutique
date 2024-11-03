// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionModalFormProduct } from "../../redux/actionRedux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/item.module.css";

export default function Item({ product }) {
  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use event handles
  const updateProductHandle = (product) => {
    navigate(`?mode=update`);
    dispatch(actionModalFormProduct.update(product));
  };

  const deleteProductHandle = async (productId) => {
    try {
      const res = await APIServer.shop.deleteProduct(productId);
      if (res.status === 200) {
        const { message } = res.data;
        alert(message);
        window.location.reload();
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);

      if (error.status === 401) {
        return navigate("/");
      }
    }
  };

  return (
    <div className={classes["product-item"]}>
      <div className={`${classes["bg-content"]} ${classes["id"]}`}>
        <p>{product._id}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["name"]}`}>
        <p>{product.name}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["price"]}`}>
        <p>{product.price} </p>
        <span>VND</span>
      </div>
      <div className={`${classes["bg-content"]} ${classes["image"]}`}>
        <img src={product.images[0]} alt={product.images[0]} loading="lazy" />
      </div>
      <div className={`${classes["bg-content"]} ${classes["category"]}`}>
        <p>{product.category}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["edit"]}`}>
        <button
          type="button"
          className={classes["btn-update"]}
          onClick={() => updateProductHandle(product)}
        >
          Update
        </button>
        <button
          type="button"
          className={classes["btn-delete"]}
          onClick={() => deleteProductHandle(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
