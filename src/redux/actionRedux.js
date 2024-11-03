// Import Modules
import {
  userSlice,
  sidebarSlice,
  modalFormProductSlice,
  modalCheckoutSlice,
} from "./sliceRedux";

const actionUser = userSlice.actions;
const actionSidebar = sidebarSlice.actions;
const actionModalFormProduct = modalFormProductSlice.actions;
const actionModalCheckout = modalCheckoutSlice.actions;

export {
  actionUser,
  actionSidebar,
  actionModalFormProduct,
  actionModalCheckout,
};
