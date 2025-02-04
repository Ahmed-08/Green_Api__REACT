import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import accessSlice from '../../domain/slices/accessSlice';
import chatSlice from "../../domain/slices/chatSlice";


export const store = configureStore({
    reducer: {
        access: accessSlice,
        chats: chatSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();