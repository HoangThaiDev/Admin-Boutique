// Import Modules
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionModalFormProduct } from "../redux/actionRedux";
import { useNavigate } from "react-router-dom";
import APIServer from "../API/customAPI";
// Import File CSS
import classes from "./css/form.module.css";

export default function Form({ mode, productDetail, isShow }) {
  // Create + use States
  const [valueProduct, setValueProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    short_desc: "",
    long_desc: "",
    images: [],
  });

  const [isShowErrors, setIsShowErrors] = useState({
    name: false,
    category: false,
    price: false,
    quantity: false,
    short_desc: false,
    long_desc: false,
    images: false,
  });

  const [inputFileImage, setInputFileImage] = useState(Date.now());
  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Side Effects
  useEffect(() => {
    if (productDetail && mode === "update") {
      let cloneProductDetail = { ...productDetail };
      cloneProductDetail.price = cloneProductDetail.price.replace(/\./g, "");
      cloneProductDetail.quantity = cloneProductDetail.quantity.toString();
      cloneProductDetail.long_desc = cloneProductDetail.long_desc.replace(
        /\; /g,
        ";\n"
      );
      setValueProduct((prevState) => ({
        ...prevState,
        name: cloneProductDetail.name,
        category: cloneProductDetail.category,
        price: cloneProductDetail.price,
        quantity: cloneProductDetail.quantity,
        short_desc: cloneProductDetail.short_desc,
        long_desc: cloneProductDetail.long_desc,
      }));
    } else {
      setValueProduct({
        name: "",
        category: "",
        price: "",
        quantity: "",
        short_desc: "",
        long_desc: "",
        images: [],
      });
    }
  }, [mode]);

  // Create + use event handles
  const changeValuesProduct = (e, name) => {
    if (name === "images") {
      const valueImages = e.target.files;
      setValueProduct((prevState) => ({ ...prevState, images: valueImages }));
    } else {
      const valueInput = e.target.value;
      setValueProduct((prevState) => ({ ...prevState, [name]: valueInput }));
    }
  };

  const closeModalHandle = () => {
    setInputFileImage(Date.now());
    dispatch(actionModalFormProduct.hide());
    navigate("/dashboard/products");
  };

  const checkValidateForm = () => {
    let result = true;

    // Check input name
    if (valueProduct.name.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, name: true }));
    }

    // Check input category
    if (valueProduct.category.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, category: true }));
    }

    // Check input price
    if (valueProduct.price.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, price: true }));
    }

    // Check input quantity
    if (valueProduct.quantity.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, quantity: true }));
    }

    // Check input short desc
    if (valueProduct.short_desc.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, short_desc: true }));
    }

    // Check input long desc
    if (valueProduct.long_desc.length === 0) {
      result = false;
      setIsShowErrors((prevState) => ({ ...prevState, long_desc: true }));
    }

    // Check input images

    if (valueProduct.images.length === 0) {
      result = false;

      setIsShowErrors((prevState) => ({ ...prevState, images: true }));
    }

    return result;
  };

  const addProductHandle = async (e) => {
    e.preventDefault();
    const result = checkValidateForm();
    if (!result) return alert("You need input full values!");

    // Convert to FormData
    const formData = new FormData();
    formData.append("name", valueProduct.name);
    formData.append("category", valueProduct.category);
    formData.append("price", valueProduct.price);
    formData.append("quantity", valueProduct.quantity);
    formData.append("short_desc", valueProduct.short_desc);
    formData.append("long_desc", valueProduct.long_desc);

    for (let image of valueProduct.images) {
      formData.append("images", image);
    }

    try {
      const res = await APIServer.shop.addProduct(formData);
      if (res.status === 201) {
        const { message } = res.data;
        alert(message);
        window.location.reload();

        // Reset Page
        navigate("/dashboard/products");
        dispatch(actionModalFormProduct.hide());
        setInputFileImage(Date.now());
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);

      if (error.status === 401) {
        dispatch(actionModalFormProduct.hide());
        return navigate("/");
      }

      if (error.status === 403) {
        dispatch(actionModalFormProduct.hide());
      }

      // Reset Page
      navigate("/dashboard/products");
      setInputFileImage(Date.now());
    }
  };

  const updateProductHandle = async (e) => {
    e.preventDefault();

    const result = checkValidateForm();
    if (!result) return alert("You need input full values!");

    // Convert to FormData
    const formData = new FormData();
    formData.append("id", productDetail._id);
    formData.append("name", valueProduct.name);
    formData.append("category", valueProduct.category);
    formData.append("price", valueProduct.price);
    formData.append("quantity", valueProduct.quantity);
    formData.append("short_desc", valueProduct.short_desc);
    formData.append("long_desc", valueProduct.long_desc);

    for (let image of valueProduct.images) {
      formData.append("images", image);
    }

    try {
      const res = await APIServer.shop.updateProduct(formData);
      if (res.status === 200) {
        const { message } = res.data;
        alert(message);
        window.location.reload();

        // Reset Page
        navigate("/dashboard/products");
        dispatch(actionModalFormProduct.hide());
        setInputFileImage(Date.now());
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);

      if (error.status === 401) {
        dispatch(actionModalFormProduct.hide());
        return navigate("/");
      }

      if (error.status === 403) {
        dispatch(actionModalFormProduct.hide());
      }

      // Reset Page
      navigate("/dashboard/products");
      setInputFileImage(Date.now());
    }
  };

  return (
    <div
      className={
        isShow
          ? `${classes["modal-form-product-container"]} ${classes["active"]}`
          : classes["modal-form-product-container"]
      }
    >
      <form
        className={classes["form-product"]}
        onSubmit={mode === "add" ? addProductHandle : updateProductHandle}
      >
        <div className={`${classes["form-input"]} ${classes["name"]}`}>
          <label htmlFor="name">Product Name</label>
          <input
            className={
              isShowErrors.name
                ? `${classes["input"]} ${classes["input-error"]}`
                : classes["input"]
            }
            type="text"
            name="name"
            id="name"
            value={valueProduct.name}
            placeholder="Enter Product Name"
            onChange={(e) => changeValuesProduct(e, "name")}
          />
        </div>
        <div className={`${classes["form-input"]} ${classes["category"]}`}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={valueProduct.category}
            placeholder="Enter Category"
            onChange={(e) => changeValuesProduct(e, "category")}
          />
        </div>
        <div className={`${classes["form-input"]} ${classes["price"]}`}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={valueProduct.price}
            placeholder="Enter Price"
            onChange={(e) => changeValuesProduct(e, "price")}
          />
        </div>
        <div className={`${classes["form-input"]} ${classes["quantity"]}`}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={valueProduct.quantity}
            placeholder="Enter Quantity"
            onChange={(e) => changeValuesProduct(e, "quantity")}
          />
        </div>
        <div className={`${classes["form-input"]} ${classes["short-desc"]}`}>
          <label htmlFor="shortDesc">Short Description</label>
          <textarea
            name="shortDesc"
            id="shortDesc"
            placeholder="Enter Short Description"
            rows={5}
            value={valueProduct.short_desc}
            onChange={(e) => changeValuesProduct(e, "short_desc")}
          ></textarea>
        </div>
        <div className={`${classes["form-input"]} ${classes["long-desc"]}`}>
          <label htmlFor="longDesc">Long Description</label>
          <textarea
            name="longDesc"
            id="longDesc"
            placeholder="Enter Long Description like: desc1; desc2; ... descN"
            rows={10}
            value={valueProduct.long_desc}
            onChange={(e) => changeValuesProduct(e, "long_desc")}
          ></textarea>
        </div>
        <div className={`${classes["form-input"]} ${classes["image"]}`}>
          <label htmlFor="images">Upload image (5 images)</label>
          <input
            key={inputFileImage}
            type="file"
            name="images"
            id="images"
            multiple
            onChange={(e) => changeValuesProduct(e, "images")}
          />
        </div>
        <button type="submit" className={classes["btn-submit"]}>
          Submit
        </button>
        <button
          type="button"
          className={classes["btn-cancel"]}
          onClick={closeModalHandle}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
