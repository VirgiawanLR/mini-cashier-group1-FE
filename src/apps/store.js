import userReducer from "../features/users/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
