import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habitSlice";

export const store = configureStore({
	reducer: {
		habit: habitReducer,
	},
});
