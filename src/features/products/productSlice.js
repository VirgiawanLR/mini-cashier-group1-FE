import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const userAPI = "http://localhost:8000/product";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [
      { productName: "Apple", productPrice: "5000", id: 1 },
      { productName: "Melon", productPrice: "25000", id: 2 },
      { productName: "Orange", productPrice: "8000", id: 3 },
      { productName: "Watermelon", productPrice: "30000", id: 4 },
      { productName: "Pear", productPrice: "5000", id: 5 },
      { productName: "Grape", productPrice: "17000", id: 6 },
      { productName: "Peach", productPrice: "8000", id: 7 },
      { productName: "Longan", productPrice: "10000", id: 8 },
      { productName: "Lychee", productPrice: "3000", id: 9 },
    ],
    productData: {
      id: 0,
      productName: "",
      productPrice: 0,
    },
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
      // payload = data yg dikirim dari dispatch() di bawah
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProductList, setProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async () => {
    console.log(`fetched`);
    // let response = await productList;
    // dispatch(setProductList(response.data));
  };
}
