// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProducts: () => {
      return axiosIntance.get(`shop/products`);
    },

    getProductsByPage: (page) => {
      return axiosIntance.get(`shop/products/page?page=${page}`);
    },

    addProduct: (product) => {
      return axiosIntance.post(`shop/product/add`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    updateProduct: (product) => {
      return axiosIntance.post(`shop/product/update`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    deleteProduct: (productId) => {
      return axiosIntance.delete(`shop/product/${productId}`);
    },
  },
  checkout: {
    getCheckouts: () => {
      return axiosIntance.get("checkout/checkouts");
    },
    getCheckoutsByPage: (page) => {
      return axiosIntance.get(`checkout/checkouts/page?page=${page}`);
    },
  },
  admin: {
    postSignUpAdmin: (formValues) => {
      return axiosIntance.post("admin/sign-up", formValues);
    },
    postLoginAdmin: (formValues) => {
      return axiosIntance.post("admin/login", formValues);
    },
    getAdmin: () => {
      return axiosIntance.get("admin");
    },
    getAdmins: () => {
      return axiosIntance.get("admin/admins");
    },
    getLogout: () => {
      return axiosIntance.get("admin/logout");
    },
    getAdminsByPage: (page) => {
      return axiosIntance.get(`admin/admins/page?page=${page}`);
    },
    postUpdateAdmin: (valuesAdmin) => {
      return axiosIntance.post("admin/update", valuesAdmin);
    },
    deleteAdmin: (adminId) => {
      return axiosIntance.delete(`admin/delete/${adminId}`);
    },
  },
  chatRoom: {
    getRooms: () => {
      return axiosIntance.get("chatRoom/rooms");
    },
    joinRoom: (roomID, accessToken) => {
      return axiosIntance.post(`chatRoom/join/${roomID}`, { accessToken });
    },
  },
  message: {
    send: (roomID, valueMessage) => {
      return axiosIntance.post(`message/send/${roomID}`, {
        sender: "admin",
        valueMessage,
      });
    },
    get: (roomID) => {
      return axiosIntance.get(`message/get/${roomID}`);
    },
  },
};

export default APIServer;
