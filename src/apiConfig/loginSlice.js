import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://service-provider-9f2b.onrender.com/api/v1"

export const getLoginApi = createAsyncThunk('authentication/login', async (data) => {
  const response = await axios.post(`${apiUrl}/user/login`, data)
  //window.location.href = '/app/welcome'
  return response.data;
})

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    login: {},
  },

  extraReducers: {
    [getLoginApi.pending]: (state) => {
      state.isLoading = true;
    },
    [getLoginApi.fulfilled]: (state, action) => {
      console.log("loginloginloginlogin", action);
      state.login = action.payload.message;
      state.isLoading = false;
    },
    [getLoginApi.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = loginSlice.actions

export default loginSlice.reducer;
