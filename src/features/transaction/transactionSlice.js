import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transAPI = "http://localhost:8000/transaction";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: [],
    singleTransaction: {},
    dataAndPageCount: {},
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
  },
});

export default transactionSlice.reducer;

export const { setTransactionList, setSingleTransData, setDataAndPageCount } =
  transactionSlice.actions;

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
      console.log(start, end);
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
