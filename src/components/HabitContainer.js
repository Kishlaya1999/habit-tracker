import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Habits from "./Habits";
import { addHabit } from "../features/habitSlice";

function HabitContainer() {
	// creating state for accepting the habit name and discription of the habit form input box
	const [habit, setHabit] = useState("");
	const [description, setDescription] = useState("");

	// using useDispatch hook for dispatching the action from UI to the redux store which will change the UI on global state change
	const dispatch = useDispatch();

	// This funciton will run on clicking Add Habit button
	const addYourHabitOnClick = () => {
		// This function is used for formatting the date in DD/MM/YY format
		function formatDate(date) {
			var dd = date.getDate();
			var mm = date.getMonth() + 1;
			var yyyy = date.getFullYear().toString().substring(2);
			if (dd < 10) {
				dd = "0" + dd;
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			date = dd + "/" + mm + "/" + yyyy;
			return date;
		}

		// This function is responsible for returning the array of last 7 day dates
		function Last7Days() {
			// Creating 7 variables for 7 days; At this point all the variables is assigned as today's date
			var today = new Date();
			var oneDayAgo = new Date(today);
			var twoDaysAgo = new Date(today);
			var threeDaysAgo = new Date(today);
			var fourDaysAgo = new Date(today);
			var fiveDaysAgo = new Date(today);
			var sixDaysAgo = new Date(today);

			// setDate is responsible for setting up the appropriate value for last 6 days
			oneDayAgo.setDate(today.getDate() - 1);
			twoDaysAgo.setDate(today.getDate() - 2);
			threeDaysAgo.setDate(today.getDate() - 3);
			fourDaysAgo.setDate(today.getDate() - 4);
			fiveDaysAgo.setDate(today.getDate() - 5);
			sixDaysAgo.setDate(today.getDate() - 6);

			// formatting the date accordingly as we want in our project
			var result0 = formatDate(today);
			var result1 = formatDate(oneDayAgo);
			var result2 = formatDate(twoDaysAgo);
			var result3 = formatDate(threeDaysAgo);
			var result4 = formatDate(fourDaysAgo);
			var result5 = formatDate(fiveDaysAgo);
			var result6 = formatDate(sixDaysAgo);

			// Creating the array of last 7 days and returing it
			var result = [result0, result1, result2, result3, result4, result5, result6];
			return result;
		}

		// Creating the habit object with all the info which is required for creating different functionalities
		let habitToBeAdded = {
			id: Date.now(),
			title: habit,
			description: description,
			dates: [
				{ date: Last7Days()[6], status: "none" },
				{ date: Last7Days()[5], status: "none" },
				{ date: Last7Days()[4], status: "none" },
				{ date: Last7Days()[3], status: "none" },
				{ date: Last7Days()[2], status: "none" },
				{ date: Last7Days()[1], status: "none" },
				{ date: Last7Days()[0], status: "none" },
			],
		};
		// Setting up the habit and discription state to empty string so that input box can get empty
		setHabit("");
		setDescription("");

		// dispatching the data [habitToBeAdded] object to addHabit (reducer)
		dispatch(addHabit(habitToBeAdded));
	};

	// useSelector hook is used to get the data form the redux store
	// getting all the habits from redux store and displaying it in UI
	// data is the array of objects in which a single object represents a habit
	const data = useSelector((h) => {
		// console.log(c.habit.habits);
		return h.habit.habits;
	});

	return (
		<div className="main-container">
			<div className="habits-bar-container">
				<section className="habit-adding">
					<div className="input-bar">
						<span className="icon-container">
							<i className="fa-solid fa-repeat"></i>
						</span>
						<input onChange={(e) => setHabit(e.target.value)} value={habit} type="text" placeholder="Enter the name of habit" />
					</div>
					<div className="input-bar">
						<span className="icon-container">
							<i className="fa-solid fa-circle-info"></i>
						</span>
						<input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Write the discription of the habit...." />
					</div>
					<button onClick={addYourHabitOnClick}>Add Habit</button>
				</section>
				{/* using map funciton to display all the habits added till now */}
				{data.map((habit, index) => {
					// here habit is the object which contains the id, title, discription, dates
					// passing all the information of current habit as props to Habits component
					return <Habits habitName={habit.title} habitDiscription={habit.description} habitStatus={habit.dates} habitId={habit.id} key={index} />;
				})}
			</div>
		</div>
	);
}

export default HabitContainer;
