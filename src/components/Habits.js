/** @format */

import React, { useEffect, useState } from "react";
// importing the useDispatch hook so that the reducer can be dispatched with data to change the state
import { useDispatch } from "react-redux";
// importing the deleteHabit and updateStatus reducers [function] from habitSlice
import { deleteHabit, updateStatus } from "../features/habitSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Habits({ habitName, habitDiscription, habitStatus, habitId }) {
	// We are getting habitName, habitDiscription, habitStatus, habitId as props from parent component i.e HabitContainer

	const [isVisible, setIsVisible] = useState(false);
	// using useDispatch hoot for dispatching data form the UI to redux store so that state can be updated accordingly
	// data which is begin send is known as payload and redux store can access the data
	const dispatch = useDispatch();

	useEffect(() => {
		// Code for highlighting the current date and its status
		const dates = document.getElementsByClassName("dates");
		const dateArray = Object.values(dates).map((date) =>
			Number(date.innerHTML.split("/")[0])
		);
		const today = new Date();
		const todayDate = today.getDate();
		if (dates.length > 0) {

			const indexOfTodaysDateInDatesArray = dateArray.indexOf(todayDate);
			dates[indexOfTodaysDateInDatesArray].style.backgroundColor = "purple";

			const dateStatus = document.getElementsByClassName("date-status");
			dateStatus[indexOfTodaysDateInDatesArray].style.backgroundColor = "purple";

		}

	}, [isVisible]);

	// This function is executed when any of the dates status has to be changed i.e none,done,fail
	const updateCompleteStatus = (e) => {
		// Restricting user to select future dates
		let clickedFullDate = e.target.getAttribute("data-date");
		console.log(clickedFullDate.split("/"));
		let clickedMonth = Number(clickedFullDate.split("/")[1]);
		let clickedDate = Number(clickedFullDate.split("/")[0]);
		let todayDate = new Date();

		if (clickedMonth > todayDate.getMonth() + 1) {
			toast.error("You can only change for current and past dates. Not for future dates", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				theme: "dark",
			});
			return;
		} else if (clickedDate > todayDate.getDate()) {
			toast.error("You can only change for current and past dates. Not for future dates", {
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
		// constructing the data object for updating the status of the date selected
		const data = {
			date: e.target.getAttribute("data-date"),
			id: habitId,
		};

		// dispatching the data to redux store ; data is passed as an argument to updateStatus reducer [function]
		dispatch(updateStatus(data));
	};

	return (
		<div className="list-of-habits">
			<div className="name-and-icon">
				<div className="habit-details">
					<div className="habit-name">{habitName}</div>
					<div className="habit-description">{habitDiscription}</div>
				</div>
				<div className="accordion-icon" onClick={() => setIsVisible(!isVisible)}>
					<i class={`fa-solid ${isVisible ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
				</div>
			</div>

			{isVisible && (
				<div className="seven-days-of-week">
					<table>
						<thead>
							<tr>
								{/* displaying the dates of the Last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index < 7) {
										return (
											<th key={index} className="dates">
												{habitStatus[index].date}
											</th>
										);
									}
								})}
							</tr>
						</thead>
						<tbody>
							<tr>
								{/* Displaying the habit status of the last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index < 7) {
										return (
											<td
												key={index}
												onClick={updateCompleteStatus}
												data-date={habitStatus[index].date}
												className="date-status">
												{/* displaying the none, done or fail icon accoring to the state */}
												{habitStatus[index].status ===
													"none" ? (
													<i class="fa-solid fa-minus"></i>
												) : habitStatus[index].status ===
													"done" ? (
													<i className="fa-solid fa-circle-check done"></i>
												) : (
													<i className="fa-solid fa-circle-xmark fail"></i>
												)}
											</td>
										);
									}
								})}
							</tr>
						</tbody>
					</table>
					<table>
						<thead>
							<tr>
								{/* displaying the dates of the Last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index >= 7 && index < 14) {
										return (
											<th key={index} className="dates">
												{habitStatus[index].date}
											</th>
										);
									}
								})}
							</tr>
						</thead>
						<tbody>
							<tr>
								{/* Displaying the habit status of the last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index >= 7 && index < 14) {
										return (
											<td
												key={index}
												onClick={updateCompleteStatus}
												data-date={habitStatus[index].date}
												className="date-status">
												{/* displaying the none, done or fail icon accoring to the state */}
												{habitStatus[index].status ===
													"none" ? (
													<i class="fa-solid fa-minus"></i>
												) : habitStatus[index].status ===
													"done" ? (
													<i className="fa-solid fa-circle-check done"></i>
												) : (
													<i className="fa-solid fa-circle-xmark fail"></i>
												)}
											</td>
										);
									}
								})}
							</tr>
						</tbody>
					</table>
					<table>
						<thead>
							<tr>
								{/* displaying the dates of the Last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index >= 14) {
										return (
											<th key={index} className="dates">
												{habitStatus[index].date}
											</th>
										);
									}
								})}
							</tr>
						</thead>
						<tbody>
							<tr>
								{/* Displaying the habit status of the last 7 day */}
								{Object.values(habitStatus).map((date, index) => {
									if (index >= 14) {
										return (
											<td
												key={index}
												onClick={updateCompleteStatus}
												data-date={habitStatus[index].date}
												className="date-status">
												{/* displaying the none, done or fail icon accoring to the state */}
												{habitStatus[index].status ===
													"none" ? (
													<i class="fa-solid fa-minus"></i>
												) : habitStatus[index].status ===
													"done" ? (
													<i className="fa-solid fa-circle-check done"></i>
												) : (
													<i className="fa-solid fa-circle-xmark fail"></i>
												)}
											</td>
										);
									}
								})}
							</tr>
						</tbody>
					</table>
				</div>
			)}
			{/* Delete button for deleting a habit */}
			{/* dispatching deleteHabit reducer with habitId as payload so that the selected habit can be deleted */}
			<div onClick={() => dispatch(deleteHabit(habitId))} className="delete-btn">
				<i className="fa-solid fa-trash"></i>
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

export default Habits;
