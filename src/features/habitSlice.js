import { createSlice } from "@reduxjs/toolkit";

let habitsArr = localStorage.getItem("habits");
if (habitsArr === null) {
	habitsArr = [];
} else {
	habitsArr = JSON.parse(localStorage.getItem("habits"));
}

const initialState = {
	habits: habitsArr,
};
// console.log(initialState);

export const habitSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addHabit: (state, action) => {
			state.habits = [...state.habits, action.payload];
			const newHabitsArr = state.habits;
			localStorage.setItem("habits", JSON.stringify(newHabitsArr));
			// console.log(state.habits);
		},
		deleteHabit: (state, action) => {
			// console.log(action.payload);
			const idOfHabitToBeDeleted = Number(action.payload);
			const habitsArrayFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
			let newArray = habitsArrayFromLocalStorage.filter((habit) => habit.id !== idOfHabitToBeDeleted);
			localStorage.setItem("habits", JSON.stringify(newArray));
			state.habits = newArray;
		},
		updateStatus: (state, action) => {
			// console.log(action.payload);
			const data = action.payload;
			const habitsArrayFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
			let habitToBeUpdated = habitsArrayFromLocalStorage.filter((habit) => habit.id === data.id);
			let habitObjectToBeUpdated = habitToBeUpdated[0];
			// console.log(habitToBeUpdated[0].dates[0]);
			// console.log(typeof data.date);
			// var indexOfDate;

			let newDateArray = habitObjectToBeUpdated.dates.map((date, index) => {
				if (date.date === data.date) {
					// console.log(date.status);
					if (date.status === "none") {
						date.status = "done";
					} else if (date.status === "done") {
						date.status = "fail";
					} else if (date.status === "fail") {
						date.status = "none";
					}
					// console.log(date);
				}
				return date;
			});
			// habitObjectToBeUpdated.dates = newDateArray;
			let newHabitsArrayToBeStoredInLocalStorage = habitsArrayFromLocalStorage.map((habit, index) => {
				if (data.id === habit.id) {
					habit.dates = newDateArray;
				}
				return habit;
			});
			// console.log(newHabitsArrayToBeStoredInLocalStorage);
			localStorage.setItem("habits", JSON.stringify(newHabitsArrayToBeStoredInLocalStorage));
			state.habits = newHabitsArrayToBeStoredInLocalStorage;
		},
	},
});

export const { addHabit, deleteHabit, updateStatus } = habitSlice.actions;

export default habitSlice.reducer;
