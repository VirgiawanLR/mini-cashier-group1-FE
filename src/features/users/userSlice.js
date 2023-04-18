import { createSlice } from "@reduxjs/toolkit";
import { Axios } from "axios";

const userAPI = "http://localhost:8000/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: {
      userName: "",
      email: "",
      phoneNumber: "",
      user_ID: 0,
      isSuccess: false,
    },
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
