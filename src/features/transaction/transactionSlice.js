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
  },
});

export default transactionSlice.reducer;

export const {
  setTransactionList,
  setSingleTransData,
  setDataAndPageCount,
  setTotalGross,
  setTotalOrder,
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
      const newData = checkZeroTransactionDay({
        start,
        end,
        data,
        field: "total_gross",
      });
      dispatch(setTotalGross(newData));
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
      const newData = checkZeroTransactionDay({
        start,
        end,
        data,
        field: "total_transaction",
      });
      dispatch(setTotalOrder(newData));
      return { message, isSuccess };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function checkZeroTransactionDay({ start, end, data, field }) {
  let range;
  if (!(start && end)) {
    range = 6;
    end = new Date();
    start = new Date().setDate(end.getDate() - range);
    start = new Date(start).toISOString().split("T")[0];
  } else {
    start = start.split(" ")[0];
    end = end.split(" ")[0];
    if (start === end) {
      if (data.length === 0) {
        let returndata = { date_column: start };
        returndata[field] = "0";
        return [returndata];
      }
      return data;
    }
    let startmilis = new Date(start).getTime();
    let endmilis = new Date(end).getTime();
    range = (endmilis - startmilis) / (1000 * 60 * 60 * 24);
  }
  let newDataArr = [start];
  for (let i = 1; i <= range; i++) {
    let tomorrow = new Date(start);
    tomorrow.setDate(tomorrow.getDate() + i);
    newDataArr.push(tomorrow.toISOString().split("T")[0]);
  }
  newDataArr = newDataArr.reverse();
  let prevDataIndex = 0;
  newDataArr = newDataArr.map((item) => {
    let singleData = { date_column: item };
    if (item === data[prevDataIndex]?.date_column) {
      singleData[field] = data[prevDataIndex][field].toString();
      prevDataIndex += 1;
      return singleData;
    } else {
      singleData[field] = "0";
      return singleData;
    }
  });
  return newDataArr;
}
