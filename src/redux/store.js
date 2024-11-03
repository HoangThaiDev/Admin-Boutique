// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import {
  userSlice,
  sidebarSlice,
  modalFormProductSlice,
  modalCheckoutSlice,
} from "./sliceRedux";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    sidebar: sidebarSlice.reducer,
    modalFormProduct: modalFormProductSlice.reducer,
    modalCheckout: modalCheckoutSlice.reducer,
  },
});

export default store;
