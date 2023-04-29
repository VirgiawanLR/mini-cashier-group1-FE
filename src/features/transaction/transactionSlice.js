import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transAPI = "http://localhost:8000/transaction";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: [],
  },
  reducers: {
    setTransactionList: (state, action) => {
      state.transactionList = action.payload;
    },
  },
});

export default transactionSlice.reducer;

export const { setTransactionList } = transactionSlice.actions;

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
      getAPI += `start=${start}&end=${end}&`;
    }
    getAPI += `offset=${offset}&limit=${limit}`;

    try {
      let response = await axios.get(getAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      });
      const { message, isSuccess, data } = response.data;
      dispatch(setTransactionList(data));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}
