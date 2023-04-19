import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },

  reducers: {
    addCart: (state, action) => {
      state.cartList.push(action.payload);
    },
    setCart: (state, action) => {
      state.cartList = action.payload;
    },
  },
});

export const { addCart, setCart, delCart } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://localhost:2000/carts", data);
    // dispatch(addCart(response.data))
    // data di-post, display data di-fetch ulang
    dispatch(fetchCart());
  };
}

export function fetchCart(data) {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:2000/carts", data);
    dispatch(setCart(response.data));
  };
}

export function deleteCart(id) {
  return async (dispatch) => {
    let response = await Axios.delete("http://localhost:2000/carts/" + id);
    dispatch(fetchCart());
  };
}
