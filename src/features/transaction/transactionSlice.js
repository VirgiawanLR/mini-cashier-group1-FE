import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transAPI = "http://localhost:8000/transaction";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: [],
    singleTransaction: {},
    dataAndPageCount: {},
    totalGrossList: [],
    totalOrderList: [],
    categories: [],
    topProduct: [],
  },
  reducers: {
    setTransactionList: (state, action) => {
      state.transactionList = action.payload;
    },
    setSingleTransData: (state, action) => {
      state.singleTransaction = action.payload;
    },
    setDataAndPageCount: (state, action) => {
      state.dataAndPageCount = action.payload;
    },
    setTotalGross: (state, action) => {
      state.totalGrossList = action.payload;
    },
    setTotalOrder: (state, action) => {
      state.totalOrderList = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTopProduct: (state, action) => {
      state.topProduct = action.payload;
    },
  },
});

export default transactionSlice.reducer;

export const {
  setTransactionList,
  setSingleTransData,
  setDataAndPageCount,
  setTotalGross,
  setTotalOrder,
  setCategories,
  setTopProduct,
} = transactionSlice.actions;

export function newTransaction({ transaction_list, transaction_price }) {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${transAPI}/new`,
        {
          transaction_list,
          transaction_price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getDataTransaction({ start, end, offset, limit }) {
  return async (dispatch) => {
    let getAPI = `${transAPI}/data?`;
    if (start && end) {
      start += " 00:00:00";
      end += " 23:59:59";
      getAPI += `start=${start}&end=${end}&`;
    }
    getAPI += `offset=${offset}&limit=${limit}`;

    try {
      let response = await axios.get(getAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      const { message, isSuccess, data, totalPage, totalData } = response.data;
      dispatch(setTransactionList(data));
      dispatch(setDataAndPageCount({ totalPage, totalData }));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getDetailTransaction(transaction_ID) {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${transAPI}/detail`,
        {
          transaction_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );
      const { message, isSuccess, data } = response.data;
      dispatch(setSingleTransData(data));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getGrossIncome({ start, end }) {
  return async (dispatch) => {
    let endPoint = `${transAPI}/gross/daily`;
    if (start && end) {
      start = start + " 00:00:00";
      end = end + " 23:59:59";
      endPoint += `?start=${start}&end=${end}`;
    }
    try {
      let response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      const { message, isSuccess, data } = response.data;

      dispatch(setTotalGross(data));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getTotalOrder({ start, end }) {
  return async (dispatch) => {
    let endPoint = `${transAPI}/total-order/daily`;
    if (start && end) {
      start = start + " 00:00:00";
      end = end + " 23:59:59";
      endPoint += `?start=${start}&end=${end}`;
    }
    try {
      let response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      const { message, isSuccess, data } = response.data;

      dispatch(setTotalOrder(data));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${transAPI}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      const { message, isSuccess, data } = response.data;
      dispatch(setCategories({ message, isSuccess, data }));
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function getTopProductByCategory(category_ID) {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${transAPI}/categories/top-product?category_ID=${category_ID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );

      const { message, isSuccess, data } = response.data;
      dispatch(setTopProduct({ message, isSuccess, data }));
    } catch (error) {
      return { ...error.response.data };
    }
  };
}
