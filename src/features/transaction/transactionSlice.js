import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transAPI = "http://localhost:8000/transaction";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: [],
  },
  reducers: {},
});

export default transactionSlice.reducer;

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
