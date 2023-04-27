import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const userAPI = "http://localhost:8000/product";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    allProductList: [
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

    selectProductList: [],
    pageData: {
      totalCount: 0,
      currentPage: 1,
      indexStart: 0,
      indexEnd: 9,
      itemsPerPage: 9,
      maxPage: 0,
    },
  },

  reducers: {
    setAllProductList: (state, action) => {
      state.allProductList = action.payload;
      state.selectProductList = state.allProductList.filter((product) => {
        if (
          product.product_ID >= state.pageData.indexStart &&
          product.product_ID <= state.pageData.indexEnd
        ) {
          return true;
        }
      });
    },
    setSelectProductList: (state) => {
      state.selectProductList = state.allProductList.filter((product) => {
        if (
          product.product_ID >= state.pageData.indexStart &&
          product.product_ID <= state.pageData.indexEnd
        ) {
          return true;
        }
      });
    },
    setTotalCount: (state, action) => {
      state.pageData.totalCount = action.payload;
    },
    nextPage: (state) => {
      state.pageData.currentPage += 1;
      state.pageData.indexStart =
        (state.pageData.currentPage - 1) * state.pageData.itemsPerPage;
      state.pageData.indexEnd =
        state.pageData.indexStart + state.pageData.itemsPerPage;
    },
    prevPage: (state) => {
      state.pageData.currentPage -= 1;
      state.pageData.indexStart =
        (state.pageData.currentPage - 1) * state.pageData.itemsPerPage;
      state.pageData.indexEnd =
        state.pageData.indexStart + state.pageData.itemsPerPage;
    },
    setMaxPage: (state) => {
      state.pageData.maxPage = Math.ceil(
        state.pageData.totalCount / state.pageData.itemsPerPage
      );
    },
  },
});

export const {
  setAllProductList,
  setSelectProductList,
  setTotalCount,
  nextPage,
  prevPage,
  setMaxPage,
} = productSlice.actions;
export default productSlice.reducer;

export function getProducts() {
  return async (dispatch) => {
    let response = await axios.get("http://localhost:8000/home");
    dispatch(setAllProductList(response.data.products));
    dispatch(setTotalCount(response.data.count));
    dispatch(setMaxPage());
  };
}

export function fetchProducts() {
  return async (dispatch) => {
    dispatch(setSelectProductList());
  };
}

export function createNewProduct(data) {
  return async () => {
    let response = await axios.post(
      "http://localhost:8000/products/create",
      data
    );
    console.log(response);
  };
}
