import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { showNotification } from '../common/headerSlice';

export const getRoutes = createAsyncThunk('/getRoutes', async (_, { dispatch }) => {
	try {
		const response = await axios.get('https://service-provider-9f2b.onrender.com/api/v1/routing/getAll');
		return response.data.data;
	} catch (error) {
		if (error.name === "AxiosError") {
			dispatch(showNotification({ message: "NETWORK ERROR!", status: 0 }))
		} else {
			dispatch(showNotification({ message: "Unable to fetch Data", status: 0 }))
		}
		// error.response.data   will give the error from API
		return []
	}
});


export const getChildNodes = createAsyncThunk("/childNodes", async (parentNode, { dispatch }) => {
	try {
		const result = await axios.get(`https://service-provider-9f2b.onrender.com/api/v1/routing/childNode/${parentNode}`);
		return result.data.data
	} catch (error) {
		if (error.name === "AxiosError") {
			dispatch(showNotification({ message: "NETWORK ERROR!", status: 0 }))
		} else {
			dispatch(showNotification({ message: "Unable to fetch Data", status: 0 }))
		}
		// error.response.data   will give the error from API
		return []
	}
});

export const getParentNodes = createAsyncThunk("/parentNodes", async (_, { dispatch }) => {
	try {
		const result = await axios.get(`https://service-provider-9f2b.onrender.com/api/v1/routing/parentNode`);
		console.log("=======result.data.data>>>>>>>>>", result.data.data)
		return result.data.data
	} catch (error) {
		if (error.name === "AxiosError") {
			dispatch(showNotification({ message: "NETWORK ERROR!", status: 0 }))
		} else {
			dispatch(showNotification({ message: "Unable to fetch Data", status: 0 }))
		}
		// error.response.data   will give the error from API
		return []
	}
})



export const deleteRoute = createAsyncThunk('/deleteRoutes', async (id, { dispatch }) => {
	try {
		const response = await axios.delete(`https://service-provider-9f2b.onrender.com/api/v1/routing/delete/${id}`);
		if (response.data.status === "SUCCESS") {
			dispatch(getRoutes());
			dispatch(showNotification({ message: "Route Deleted!", status: 1, }));
			return response.data;
		} else {
			dispatch(showNotification({ message: response.data.message, status: 0 }));
		};
	} catch (error) {
		if (error.name === "AxiosError") {
			dispatch(showNotification({ message: "NETWORK ERROR!", status: 0 }));
		} else {
			dispatch(showNotification({ message: "Unable to delete Data", status: 0 }));
		};
		return [];
	};
});

export const addRoute = createAsyncThunk('/addRoutes', async (payload, { dispatch }) => {
	const response = await axios.post(`https://service-provider-9f2b.onrender.com/api/v1/routing/add`, payload);
	if (response.data.status === "SUCCESS") {

	}
	dispatch(getRoutes());
	return response.data;
})

export const updateRoute = createAsyncThunk('/updateRoutes', async ({ payload, id }, { dispatch }) => {
	const response = await axios.put(`https://service-provider-9f2b.onrender.com/api/v1/routing/updateBy/${id}`, payload)
	dispatch(getRoutes());
	return response.data;
})

export const getUserModuleRoute = createAsyncThunk('/getUserModuleRoutes', async () => {
	const response = await axios.get(`https://service-provider-9f2b.onrender.com/api/v1/routing/getForsideMenu`)
	return response.data;
})

export const routingSlice = createSlice({
	name: 'leads',
	initialState: {
		isLoading: false,
		list: [],
		child: [],
		routeData: [],
		parentNodeData: []
	},

	extraReducers: {
		[getRoutes.pending]: state => {
			state.isLoading = true
		},
		[getRoutes.fulfilled]: (state, action) => {
			state.routeData = action.payload
			state.isLoading = false
		},
		[getRoutes.rejected]: state => {
			state.isLoading = false
		},
		[addRoute.fulfilled]: (state, action) => {
			state.list = [...state.list, action.payload]
		},
		[deleteRoute.pending]: state => {
			state.isLoading = true
		},
		[deleteRoute.fulfilled]: (state, action) => {
			const { _id } = action.payload
			if (_id) {
				state.list = state.list.filter((ele) => ele._id !== _id)
			}
			state.isLoading = false
		},
		[deleteRoute.rejected]: state => {
			state.isLoading = false
		},
		[updateRoute.pending]: state => {
			state.isLoading = true
		},
		[updateRoute.fulfilled]: (state, action) => {
			const data = action.payload
			const index = state.list.findIndex(ele => ele._id === data._id);
			state.list[index] = data
			state.isLoading = false;
		},

		[updateRoute.rejected]: state => {
			state.isLoading = false
		},
		[getUserModuleRoute.pending]: state => {
			state.isLoading = true
		},
		[getUserModuleRoute.fulfilled]: (state, action) => {
			state.list = action.payload
			state.isLoading = false
		},
		[getUserModuleRoute.rejected]: state => {
			state.isLoading = false
		},
		[getChildNodes.fulfilled]: (state, action) => {
			state.child = action.payload
		},
		[getParentNodes.fulfilled]: (state, action) => {
			state.parentNodeData = action.payload
		}
	},

})

export default routingSlice.reducer