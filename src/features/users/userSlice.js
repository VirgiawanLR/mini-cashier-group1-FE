import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    backEndResponse: {},
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setResponse: (state, action) => {
      state.backEndResponse = action.payload;
    },
  },
});

export const { setLoggedInUser, setResponse } = userSlice.actions;

export default userSlice.reducer;

export function postNewUserData(data) {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${userAPI}/register`, data);
      dispatch(setResponse(response.data));
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(setResponse(error.response.data));
    }
  };
}
