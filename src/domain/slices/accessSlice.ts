import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataType, UserType } from "../../shared/config/types";

export const request = createAsyncThunk(
	"request/accessSlice",

	async function (
		{ url, number }: { url: string; number: number },
		{ rejectWithValue }
	) {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ phoneNumber: number }),
			});

			if (!response.ok) {
				throw new Error("error");
			}

			const result = await response.json();
            
			return result;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState: UserType = {
	myNumber: "",
	idInstance: "",
	apiTokenInstance: "",
    apiUrl: '',
	data: {
		status: true,
		code: "",
	},
};

const accessSlice = createSlice({
	name: "access",

	initialState,

	reducers: {
		setNumber(state, actions) {
			state.myNumber = actions.payload;
		},

		setData(state, actions) {
			state.data = actions.payload;
		},

		setidInstance(state, actions) {
			state.idInstance = actions.payload;
		},

		setapiTokenInstance(state, actions) {
			state.apiTokenInstance = actions.payload;
		},
		setapiUrl(state, actions) {
			state.apiUrl = actions.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(request.fulfilled, (state, actions) => {
			state.data = actions.payload as unknown as DataType;
		});
	},
});

export const { setNumber, setData, setidInstance, setapiTokenInstance, setapiUrl } =
	accessSlice.actions;
export default accessSlice.reducer;
