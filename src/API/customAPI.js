// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProducts: () => {
      return axiosIntance.get(`shop/products`);
    },
    // getProductsByQuery: (query) => {
    //   if (!query) {
    //     query = "?category=all";
    //   }

    //   return axiosIntance.get(`shop/products/query${query}`);
    // },
    // getProductDetail: (productId) => {
    //   return axiosIntance.get(`shop/product/${productId}`);
    // },

    // postAddToCart: (valueProduct) => {
    //   return axiosIntance.post("shop/products/add-to-cart", {
    //     valueProduct,
    //   });
    // },
  },
  admin: {
    postSignUpAdmin: (formValues) => {
      console.log(formValues);

      return axiosIntance.post("admin/sign-up", formValues);
    },
    postLoginAdmin: (formValues) => {
      return axiosIntance.post("admin/login", formValues);
    },
    getAdmin: () => {
      return axiosIntance.get("admin");
    },
    getLogout: () => {
      return axiosIntance.get("admin/logout");
    },
  },
};

export default APIServer;
