// importing the createSlice function from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// getting the habit array from local storage
let habitsArr = localStorage.getItem("habits");
if (habitsArr === null) {
	habitsArr = [];
} else {
	habitsArr = JSON.parse(localStorage.getItem("habits"));
}

// setting the initial state as the habit array present in local storage
const initialState = {
	habits: habitsArr,
};
// console.log(initialState);

// create slice accepts an object which has three key value pair in it
export const habitSlice = createSlice({
	name: "habit",
	initialState,
	// reducers are the function which we want to run on certain events such as button clicks, etc.
	reducers: {
		// this function is responsible when we Add Habit is clicked
		// this function will add a habit in local storage and also changes the current state
		addHabit: (state, action) => {
			/*
			 * updating the current state
			 * using spread operator (...state.habits) for getting previous data and then adding the new data at the end
			 * action.payload [haibitToBeAdded] is the object that is sent form the HabitContainer
			 * action.payload = habitToBeAdded: {id: number, title: string, description: string, dates: {date: any, status: string};
			 */
			state.habits = [...state.habits, action.payload];
			const newHabitsArr = state.habits;
			// updating the local storage with the new state which contains the new habit also
			localStorage.setItem("habits", JSON.stringify(newHabitsArr));
			// console.log(state.habits);
		},
		// this function is responsible for deleting a habit on clicking the delete button
		deleteHabit: (state, action) => {
			// console.log(action.payload);
			/*
			 * habitId is comming as payload which is in the form of string so first converting it into the number
			 * getting the array of habits from the local storage so that selected habit can be deleted
			 * using filter method for deleting the habit on the basis of the habitId , we will get the new habit array with the selected habit deleted
			 * updating the local storage with the new array
			 * updating the current state with new array with one habit less
			 */
			const idOfHabitToBeDeleted = Number(action.payload);
			const habitsArrayFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
			let newArray = habitsArrayFromLocalStorage.filter((habit) => habit.id !== idOfHabitToBeDeleted);
			localStorage.setItem("habits", JSON.stringify(newArray));
			state.habits = newArray;
		},
		// this function is responsible for updating the status for a particular habit and day
		updateStatus: (state, action) => {
			// console.log(action.payload);
			/*
			 * action.payload contains data: {date: update the status of this date of this id, id: update the status of current habit id }
			 * getting the habit array from local storage
			 * filtering the habit array to get the habit object that is to be updated
			 */
			const data = action.payload;
			const habitsArrayFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
			let habitToBeUpdated = habitsArrayFromLocalStorage.filter((habit) => habit.id === data.id);
			let habitObjectToBeUpdated = habitToBeUpdated[0];
			// console.log(habitToBeUpdated[0].dates[0]);
			// console.log(typeof data.date);
			// var indexOfDate;

			/*
			 * iterating through the date object and as soon as the date matches the payload date we change the completion status according to the current status
			 */
			let newDateArray = habitObjectToBeUpdated.dates.map((date) => {
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
				// returning the new date array
				return date;
			});
			// habitObjectToBeUpdated.dates = newDateArray;

			/*
			 * Searching the habit by its id and then replacing that habit's object date's object
			 */
			let newHabitsArrayToBeStoredInLocalStorage = habitsArrayFromLocalStorage.map((habit) => {
				if (data.id === habit.id) {
					habit.dates = newDateArray;
				}
				return habit;
			});
			// console.log(newHabitsArrayToBeStoredInLocalStorage);

			/*
			 * updating the local storage with the new updated date object
			 * and also updating the habit state so that changes are also visible in UI
			 */
			localStorage.setItem("habits", JSON.stringify(newHabitsArrayToBeStoredInLocalStorage));
			state.habits = newHabitsArrayToBeStoredInLocalStorage;
		},
	},
});

console.log(habitSlice);

// exporting the reducers [functions]
export const { addHabit, deleteHabit, updateStatus } = habitSlice.actions;

export default habitSlice.reducer;
