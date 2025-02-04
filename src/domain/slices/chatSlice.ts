import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	ChatType,
	MessageType,
	NotificationType,
} from "../../shared/config/types";

enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
};

const headers = { "Content-Type": "application/json" };

export const setJurnal = createAsyncThunk(
	"getJurnal/chatSlice",

	async ({
		url,
		numberPhone,
	}: {
		url: string;
		numberPhone: string;
	}) => {
		const responce = await fetch(url, {
			method: HttpMethod.POST,
			headers,
			body: JSON.stringify({
				chatId: `${numberPhone}@c.us`,
				count: 20,
			}),
		});

		const messages = await responce.json();

		return Array.isArray(messages) ? messages.reverse() : [];
	}
);

export const receiveNotification = createAsyncThunk(
	"receiveNotification/chatSlice",

	async ({ url }: { url: string }) => {
		const responce = await fetch(url);
		const payload = await responce.json();

		console.log('[receiveNotification]', {payload})

		return payload;
	}
);

export const requestToAddChat = createAsyncThunk(
	"requestToAddChat/chatSlice",

	async ({
		number,
	}: {
		idInstance: string;
		apiTokenInstance: string;
		number: string;
		apiUrl: string;
	}) => {

		return {number}
	}
		
);

interface IChats {
	chats: ChatType[];
	notification: NotificationType;
	jurnal: MessageType[];
}

const initialState: IChats = {
	chats: [],
	notification: null,
	jurnal: [],
};

const chatSlice = createSlice({
	name: "chatSlice",
	initialState,
	reducers: {
		setChat(state, actions) {
			state.chats.push(actions.payload);
		},
	},

	extraReducers: (builder) => {
		builder.addCase(requestToAddChat.fulfilled, (state, action: any) => {
			state.chats = [...state.chats, { ...action.payload }];
		});

		builder.addCase(receiveNotification.fulfilled, (state, action) => {
			state.notification = action.payload;
		});

		builder.addCase(setJurnal.fulfilled, (state, action) => {
			state.jurnal = action.payload;
		});

	},
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
