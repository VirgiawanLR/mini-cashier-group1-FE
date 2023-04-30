import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userAPI = "http://localhost:8000/products";

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

    categoryList: [],

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
      state.selectProductList = state.allProductList.slice(
        state.pageData.indexStart,
        state.pageData.indexEnd
      );
    },
    setSelectProductList: (state) => {
      state.selectProductList = state.allProductList.slice(
        state.pageData.indexStart,
        state.pageData.indexEnd
      );
    },
    setProductAZ: (state) => {
      state.allProductList = state.allProductList.sort((a, b) => {
        const nameA = a.product_name.toUpperCase();
        const nameB = b.product_name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    setProductZA: (state) => {
      state.allProductList = state.allProductList.sort((a, b) => {
        const nameA = a.product_name.toUpperCase();
        const nameB = b.product_name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
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
  setProductAZ,
  setProductZA,
  setCategoryList,
  setTotalCount,
  nextPage,
  prevPage,
  setMaxPage,
} = productSlice.actions;
export default productSlice.reducer;

export function getProducts() {
  return async (dispatch) => {
    let response = await axios.get(userAPI);
    dispatch(setAllProductList(response.data.products));
    dispatch(setSelectProductList());
    dispatch(setCategoryList(response.data.categories));
    dispatch(setTotalCount(response.data.count));
    dispatch(setMaxPage());
  };
}

export function fetchProducts() {
  return async (dispatch) => {
    dispatch(setSelectProductList());
  };
}

export function sortProductAZ() {
  return async (dispatch) => {
    dispatch(setProductAZ());
    dispatch(setSelectProductList());
  };
}

export function sortProductZA() {
  return async (dispatch) => {
    dispatch(setProductZA());
    dispatch(setSelectProductList());
  };
}

export function createNewProduct(data) {
  return async () => {
    // console.log(data);
    let response = await axios.post(
      "http://localhost:8000/products/create",
      data
    );
    console.log(response);
  };
}

export function deleteProduct(id) {
  return async (dispatch) => {
    let response = await axios.delete(`${userAPI}/delete/${id}`);
    dispatch(getProducts());
  };
}

export function editProduct(data) {
  return async () => {
    // console.log(data);
    let response = await axios.put(`${userAPI}/edit/${data.product_ID}`, data);
    console.log(response);
  };
}
