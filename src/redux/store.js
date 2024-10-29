// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./sliceRedux";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
