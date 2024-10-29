// Import Moduels
import { createSlice, current } from "@reduxjs/toolkit";

// Create initialState

const initialUser = {
  isLoggedIn: false,
  accessToken: "",
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
      };
    },
  },
});

export { userSlice };
