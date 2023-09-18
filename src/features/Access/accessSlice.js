import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showNotification } from "../common/headerSlice";

// =================================================================


export const getRoles = createAsyncThunk("/getRoles", async () => {
  try {
    const result = await axios.get(
      "https://service-provider-9f2b.onrender.com/api/v1/role/getRoleNames"
    );
    console.log("getRoles============> ", getRoles)
    return result.data.data;
  } catch (error) {
  }
});


// =================================================================

export const getAccess = createAsyncThunk("/getAccess", async () => {
  try {
    const result = await axios.get(
      `https://service-provider-9f2b.onrender.com/api/v1/access/getBy/role`
    );
    return result.data.data;
  } catch (error) {
  }
});

export const getAccessWithPagination = createAsyncThunk("/getAccess", async ({ id, page, limit }) => {
  try {
    const result = await axios.get(
      `https://service-provider-9f2b.onrender.com/api/v1/access/getBy/role/${id}?page=${page}&limit=${limit}`
    );
    return result.data.data;
  } catch (error) {
  }
});

export const addAccess = createAsyncThunk("/addAccess", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const result = await axios.post(
      "https://service-provider-9f2b.onrender.com/api/v1/access/add",
      payload
    );
    return result.data.data;
  } catch (err) {
    return rejectWithValue(err);
  }
}
);

export const deleteAccess = createAsyncThunk("/deleteAccess", async (id) => {
  const result = await axios.delete(
    `https://service-provider-9f2b.onrender.com/api/v1/access/delete/${id}`
  );
  return result.data.data;
});

export const updateAccess = createAsyncThunk("/updateAccess", async ({ payload, id, roleId, page, limit }, { dispatch }) => {
  try {
    const response = await axios.put(`https://service-provider-9f2b.onrender.com/api/v1/access/updateBy/${id}`, payload);
    if (response.data.status === "SUCCESS") {
      dispatch(getAccessWithPagination({ id: roleId, page, limit }))
      dispatch(showNotification({ message: "Access updated successfully!", status: 1 }))
      return response.data.data;
    } else (
      dispatch({ message: response.data.message, status: 0 })
    )
  } catch (error) {

  }
}
);

export const accessSlice = createSlice({
  name: "access",
  initialState: {
    isLoading: false,
    list: [],
    roles: [],
  },
  reducers: {
    clearAccessData: (state, action) => {
      state.list = []
    },
    removeAccess: (state, action) => {
      const { payload } = action;
      state.list = state.list.filter((item) => Object.keys(item)[0] !== payload);
    }
  },
  extraReducers: {
    [getAccess.pending]: (state) => {
      state.isLoading = true;
    },
    [getAccess.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
      state.isLoading = false;
    },
    [getAccessWithPagination.fulfilled]: (state, action) => {
      let roleId = Object.keys(action.payload)[0];
      state.list = state.list.filter((item) => Object.keys(item)[0] !== roleId);
      state.list = [...state.list, action.payload];
      state.isLoading = false;
    },
    [getAccess.rejected]: (state) => {
      state.isLoading = false;
    },
    [addAccess.pending]: (state) => {
      state.isLoading = true;
    },
    [addAccess.fulfilled]: (state, action) => {
      state.list = [...state.list, action.payload];
      state.isLoading = false;
    },
    [addAccess.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteAccess.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteAccess.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      if (_id) {
        state.list = state.list.filter((ele) => ele._id !== _id);
      }
      state.isLoading = false;
    },
    [deleteAccess.rejected]: (state) => {
      state.isLoading = false;
    },

    [updateAccess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAccess.fulfilled]: (state, action) => {
      const data = action.payload;
      const index = state.list.findIndex((ele) => ele._id === data._id);
      state.list[index] = data;
      state.isLoading = false;
    },

    [updateAccess.rejected]: (state) => {
      state.isLoading = false;
    },
    [getRoles.pending]: (state) => {
      state.isLoading = true;
    },
    [getRoles.fulfilled]: (state, action) => {
      state.roles = action.payload;
      state.isLoading = false;
    },
    [getRoles.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export default accessSlice.reducer;

export const { clearAccessData, removeAccess, updateAccessEntry } = accessSlice.actions