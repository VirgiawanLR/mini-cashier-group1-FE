import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
