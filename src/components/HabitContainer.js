/** @format */

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Habits from "./Habits";
import { addHabit } from "../features/habitSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HabitContainer() {
	// creating state for accepting the habit name and discription of the habit form input box
	const [habit, setHabit] = useState("");
	const [description, setDescription] = useState("");
	const [isVisibleId, setIsVisibleId] = useState("");
	const addHabitBtn = useRef();

	// using useDispatch hook for dispatching the action from UI to the redux store which will change the UI on global state change
	const dispatch = useDispatch();

	// This funciton will run on clicking Add Habit button
	const addYourHabitOnClick = () => {
		// if any of the input field is empty then
		if (habit === "") {
			// alert("Please fill both input fields and then add the habit");
			toast.error("Please fill name of the habit to add it in the list", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				theme: "dark",
			});
			return;
		}

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

		// Get today's date
		const today = new Date();
		let next21daysArray = [];
		let dates = [];
		// Loop through the next 21 days and print the date
		for (let i = 0; i < 21; i++) {
			const nextDate = new Date();
			nextDate.setDate(today.getDate() + i);
			// console.log(nextDate.toDateString());
			let formatedDate = formatDate(nextDate);
			next21daysArray.push(formatedDate);
			let currentDate = { date: next21daysArray[i], status: "none" };
			dates.push(currentDate);
		}

		// Creating the habit object with all the info which is required for creating different functionalities
		let habitToBeAdded = {
			id: Date.now(),
			title: habit,
			description: description,
			dates: dates,
		};
		// Setting up the habit and discription state to empty string so that input box can get empty
		setHabit("");
		setDescription("");

		// dispatching the data [habitToBeAdded] object to addHabit (reducer)
		dispatch(addHabit(habitToBeAdded));
	};

	// This function will run when we press enter to add a habit
	const addYourHabitOnEnter = (e) => {
		// 13 is the keyCode of enter button in keyboard
		if (e.keyCode === 13) {
			addHabitBtn.current.click();
		}
	}

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
						<input
							onChange={(e) => setHabit(e.target.value)}
							value={habit}
							type="text"
							placeholder="Enter the name of habit (required)"
							onKeyDown={addYourHabitOnEnter}
						/>
					</div>
					<div className="input-bar">
						<span className="icon-container">
							<i className="fa-solid fa-circle-info"></i>
						</span>
						<input
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							type="text"
							placeholder="Write the discription of the habit.... (optional)"
							onKeyDown={addYourHabitOnEnter}
						/>
					</div>
					<button onClick={addYourHabitOnClick} ref={addHabitBtn}>Add Habit</button>
				</section>
				<div className="contains-all-habit">
					<div className="list-of-habits-container">
						{/* using map funciton to display all the habits added till now */}
						{data.length === 0 && <h1 className="no-habit-text">No Habits Added Yet</h1>}
						{data.map((habit, index) => {
							// here habit is the object which contains the id, title, discription, dates
							// passing all the information of current habit as props to Habits component
							return (
								<Habits
									habitName={habit.title}
									habitDiscription={habit.description}
									habitStatus={habit.dates}
									habitId={habit.id}
									key={index}
									isVisibleId={isVisibleId === habit.id}
									setIsVisibleId={setIsVisibleId}
								/>
							);
						})}
					</div>
				</div>

			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="dark"
			/>
		</div>
	);
}

export default HabitContainer;
