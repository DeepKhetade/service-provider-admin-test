import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://service-provider-9f2b.onrender.com/api/v1";

//for create role
export const getUserContent = createAsyncThunk(
  "/getUserContent",
  async (data) => {
    const responce = await axios.post(`${baseUrl}/user/add`, data);
    return responce.data;
  }
);

// for get buy id
export const getContentById = createAsyncThunk(
  "/getContentById",
  async (id) => {
    const responce = await axios.get(`${baseUrl}/user/get/${id}`);
    return responce.data;
  }
);

//for delete single
export const SingleDeleteUser = createAsyncThunk(
  "/SingleDeleteUser",
  async (id) => {
    const responce = await axios.delete(`${baseUrl}/user/delete/${id} `);
    return responce.data;
  }
);

// for show
export const showUser = createAsyncThunk("/showUser", async (page, limit) => {
  const responce = await axios.get(
    `${baseUrl}/user/userlist?page=${page.page}&limit=${page.limit}&search=${page.search}`
  );
  return responce.data;
});

// for update
export const updateUser = createAsyncThunk("/updateUser", async (id, data) => {
  const responce = await axios.patch(`${baseUrl}/user/update/${id.id}`, id);
  return responce.data;
});

//for geting roles
export const getRoles = createAsyncThunk("/getRoles", async (id) => {
  const responce = await axios.get(`${baseUrl}/role/roleList/list`);
  return responce.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    id: {},
    Error: null,
    totalItems: 0,
  },
  reducers: {
    addNewUser: (state, action) => {
      let { newLeadObj } = action.payload;
      state.users = [...state.users, newLeadObj];
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.users.splice(index, 1);
    },
  },

  extraReducers: {
    [showUser.pending]: (state) => {
      state.isLoading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [showUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [SingleDeleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [SingleDeleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [SingleDeleteUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [getContentById.pending]: (state) => {
      state.isLoading = true;
    },
    [getContentById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.id = action.payload.data;
    },
    [getContentById.rejected]: (state, action) => {
      state.isLoading = false;
      state.Error = action.payload.Error;
    },

    [getUserContent.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUserContent.fulfilled]: (state, action) => {
      state.fulfilled = true;
    },
    [getUserContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.Error = action.Error;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getRoles.pending]: (state) => {
      state.isLoading = true;
    },
    [getRoles.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.id = action.payload.data;
    },
    [getRoles.rejected]: (state, action) => {
      state.isLoading = false;
      state.Error = action.payload.Error;
    },
  },
});

export const { addNewUser, deleteLead } = userSlice.actions;
export const selectTotalItems = (state) => state.users.totalItems;
export default userSlice.reducer;
