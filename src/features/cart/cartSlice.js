import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartContent: [],
    modalPopUp: false,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.cartContent = [...state.cartContent, action.payload];
    },
    resetCart: (state) => {
      state.cartContent = [];
    },

    addQtyItem: (state, action) => {
      state.cartContent[action.payload].qty += 1;
    },
    subtractQtyItem: (state, action) => {
      state.cartContent[action.payload].qty -= 1;
    },
    removeItem: (state, action) => {
      state.cartContent = [
        ...state.cartContent.slice(0, action.payload),
        ...state.cartContent.slice(action.payload + 1),
      ];
    },
    setModalState: (state, action) => {
      state.modalPopUp = action.payload;
    },
  },
});

export const {
  addItemToCart,
  resetCart,
  addQtyItem,
  subtractQtyItem,
  removeItem,
  setModalState,
} = cartSlice.actions;

export default cartSlice.reducer;
