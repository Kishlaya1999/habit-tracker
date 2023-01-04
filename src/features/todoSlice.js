import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: {},
	},
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
