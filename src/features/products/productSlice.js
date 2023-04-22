import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const userAPI = "http://localhost:8000/product";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [
      // dummy data please erase when finalized
      // { productName: "Apple", productPrice: "5000", id: 1 },
      // { productName: "Melon", productPrice: "25000", id: 2 },
      // { productName: "Orange", productPrice: "8000", id: 3 },
      // { productName: "Watermelon", productPrice: "30000", id: 4 },
      // { productName: "Pear", productPrice: "5000", id: 5 },
      // { productName: "Grape", productPrice: "17000", id: 6 },
      // { productName: "Peach", productPrice: "8000", id: 7 },
      // { productName: "Longan", productPrice: "10000", id: 8 },
      // { productName: "Lychee", productPrice: "3000", id: 9 },
    ],
    productData: {
      id: 0,
      productName: "",
      productPrice: 0,
    },
    totalCount: 0,
  },

  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },

    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setProductList, setProduct, setTotalCount } =
  productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async (dispatch) => {
    let response = await axios.get("http://localhost:8000/product/home");
    // let responseCount = await axios.get(``);
    dispatch(setProductList(response.data.products));
    dispatch(setTotalCount(response.data.count));
  };
}
