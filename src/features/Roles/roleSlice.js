

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";



const baseUrl = "https://service-provider-9f2b.onrender.com/api/v1";



export const getLeadsContent = createAsyncThunk("/leads/content", async () => {

  const response = await axios.get("/api/users?page=2", {});

  return response.data;

});



//for create role



export const createRoles = createAsyncThunk(

  "/createRoles",

  async (data, { rejectWithValue }) => {

    try {

      const responce = await axios.post(`${baseUrl}/role/add`, data);

      return responce.data;

    } catch (error) {

      return rejectWithValue(error.response.data);

    }

  }

);



// for get buy id

export const getContentById = createAsyncThunk(

  "/getContentById",

  async (id) => {

    const responce = await axios.get(`http://13.232.2.101:5000/api/role/${id}`);

    return responce.data;

  }

);



//for delete single

export const SingleDelete = createAsyncThunk("/SingleDelete", async (id) => {

  const responce = await axios.delete(`${baseUrl}/role/deleteby/${id}`);

  return responce.data;

});



// for show

export const showRoles = createAsyncThunk("/showRoles", async (page, limit) => {

  const responce = await axios.get(

    `${baseUrl}/role?page=${page.page}&limit=${page.limit}&search=${page.search}`

  );

  return responce.data;

});



// for update

export const updateRole = createAsyncThunk("/updateRole", async (id, data) => {

  const responce = await axios.patch(`${baseUrl}/role/update/${id.id}`, id);

  return responce.data;

});

export const roleSlice = createSlice({

  name: "role",

  initialState: {

    isLoading: false,

    roles: [],

    id: {},

    error: null,

  },

  reducers: {

    addNewLead: (state, action) => {

      let { newLeadObj } = action.payload;

      state.roles = [...state.roles, newLeadObj];

    },



    deleteLead: (state, action) => {

      let { index } = action.payload;

      state.roles.splice(index, 1);

    },

  },



  extraReducers: {

    [getLeadsContent.pending]: (state) => {

      state.isLoading = true;

    },

    [getLeadsContent.fulfilled]: (state, action) => {

      state.roles = action.payload.data;

      state.isLoading = false;

    },

    [getLeadsContent.rejected]: (state) => {

      state.isLoading = false;

    },

    [showRoles.pending]: (state) => {

      state.isLoading = true;

    },

    [showRoles.fulfilled]: (state, action) => {

      state.roles = action.payload;

      state.isLoading = false;

    },

    [showRoles.rejected]: (state) => {

      state.isLoading = false;

    },



    [SingleDelete.pending]: (state) => {

      state.isLoading = true;

    },

    [SingleDelete.fulfilled]: (state, action) => {

      state.isLoading = false;

    },

    [SingleDelete.rejected]: (state) => {

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

      state.error = action.payload.error;

    },



    [createRoles.pending]: (state) => {

      state.isLoading = true;

    },

    [createRoles.fulfilled]: (state, action) => {

      state.isLoading = true;

    },

    [createRoles.rejected]: (state, action) => {

      state.isLoading = false;

      state.error = action.payload.massage;

    },

    [updateRole.pending]: (state) => {

      state.isLoading = true;

    },

    [updateRole.fulfilled]: (state, action) => {

      state.isLoading = false;

    },

    [updateRole.rejected]: (state, action) => {

      state.isLoading = false;

    },

  },

});



export const { addNewLead, deleteLead } = roleSlice.actions;

export default roleSlice.reducer;

