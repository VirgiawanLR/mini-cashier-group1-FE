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
    } catch (error) {
      dispatch(setResponse(error.response.data));
    }
  };
}

export function newUserVerification(token) {
  return async (dispatch) => {
    try {
      let response = await axios.patch(
        `${userAPI}/verify-account`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
}
