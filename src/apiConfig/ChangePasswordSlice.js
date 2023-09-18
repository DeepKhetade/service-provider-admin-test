import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = "http://13.232.2.101:3169/api/v1"

export const Change_Password = createAsyncThunk('/changes/Password', async ({ values, id }) => {


  const response = await axios.patch(`${apiUrl}/user/changePassword/${id}`, values)

  return response.data;
})

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    isLoading: false,
    changePassword: {},
  },

  extraReducers: {
    [Change_Password.pending]: (state) => {
      state.isLoading = true;
    },
    [Change_Password.fulfilled]: (state, action) => {

      state.changePassword = action.payload.message;
      state.isLoading = false;
    },
    [Change_Password.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = loginSlice.actions

export default changePasswordSlice.reducer;
