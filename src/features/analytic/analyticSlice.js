import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnalytic = createAsyncThunk("/getAnalytic", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/getAnalytic");
  console.log("response.data", response.data);
  return response.data;
});
export const deleteAnalytic = createAsyncThunk(
  "/deleteAnalytic",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/deleteAnalytic/${id}`
    );
    return response.data;
  }
);
export const addAnalytic = createAsyncThunk(
  "/addAnalytic",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/addAnalytic`,
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateAnalytic = createAsyncThunk(
  "/updateAnalytic",
  async ({ payload, id }) => {
    const response = await axios.put(
      `http://localhost:8000/api/v1/updateAnalytic/${id}`,
      payload
    );
    return response.data;
  }
);
export const getAnalyticById = createAsyncThunk(
  "/getAnalyticById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/getAnalytic/${id}`
    );
    return response.data;
  }
);

export const analyticSlice = createSlice({
  name: "analytic",
  initialState: {
    isLoading: false,
    analytic: [],
  },

  extraReducers: {
    [addAnalytic.fulfilled]: (state, action) => {
      state.analytic = [...state.analytic, action.payload];
    },

    [updateAnalytic.fulfilled]: (state, action) => {
      const data = action.payload;
      const index = state.analytic.findIndex((ele) => ele._id === data._id);
      state.analytic[index] = data;
      state.isLoading = false;
    },
    [getAnalyticById.fulfilled]: (state, action) => {
      state.analytic = action.payload;
    },
    [getAnalytic.pending]: (state) => {
      state.isLoading = true;
    },
    [getAnalytic.fulfilled]: (state, action) => {
      state.analytic = action.payload;
      console.log("action", action);
      state.isLoading = false;
    },
    [getAnalytic.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteAnalytic.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAnalytic.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      if (_id) {
        state.analytic = state.analytic.filter((ele) => ele._id !== _id);
        // const index = state.analytic.findIndex(
        //   (item) => item._id === action.payload_.id
        // );
        // state.items.splice(index, 1);
      }
      state.isLoading = false;
      // const index = state.items.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // state.items.splice(index, 1);
    },
    [deleteAnalytic.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default analyticSlice.reducer;
