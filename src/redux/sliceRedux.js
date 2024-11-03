// Import Moduels
import { createSlice, current } from "@reduxjs/toolkit";

// Create initialState

const initialUser = {
  isLoggedIn: false,
  accessToken: "",
  role: "",
};

const initialSidebar = {
  isShow: false,
};

const initialModalFormProduct = {
  isShow: false,
  info: null,
};

const initialModalCheckout = {
  isShow: false,
  cart: null,
};

// Create Slice

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    logout(state) {
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
      };
    },

    save(state, action) {
      const { payload } = action;

      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        accessToken: payload.accessToken,
        role: payload.role,
      };
    },

    updateAccessToken(state, action) {
      const { payload } = action;

      return {
        ...state,
        accessToken: payload.accessToken,
      };
    },
  },
});

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebar,
  reducers: {
    toggle(state) {
      state.isShow = !state.isShow;
    },
  },
});

const modalFormProductSlice = createSlice({
  name: "modal-form-product",
  initialState: initialModalFormProduct,
  reducers: {
    add(state) {
      return { ...state, isShow: true, info: null };
    },

    hide(state) {
      return { ...state, isShow: false, info: null };
    },

    update(state, action) {
      const product = action.payload;
      return { ...state, isShow: true, info: product };
    },
  },
});

const modalCheckoutSlice = createSlice({
  name: "modal-form-product",
  initialState: initialModalCheckout,
  reducers: {
    hide(state) {
      return { ...state, isShow: false, cart: null };
    },

    show(state, action) {
      const checkout = action.payload;
      return { ...state, isShow: true, cart: checkout.cart };
    },
  },
});

export { userSlice, sidebarSlice, modalFormProductSlice, modalCheckoutSlice };
