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

export function userLogin(data) {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${userAPI}/login`, data);
      const { token, user } = response.data.data;
      localStorage.setItem("user_token", token);
      dispatch(
        setLoggedInUser({ ...user, isSuccess: response.data.isSuccess })
      );
      return {
        message: response.data.message,
        isSuccess: response.data.isSuccess,
      };
    } catch (error) {
      return { ...error.response.data };
    }
  };
}

export function keepLogIn(token) {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${userAPI}/keep-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        setLoggedInUser({
          ...response.data.data,
          isSuccess: response.data.isSuccess,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
}
