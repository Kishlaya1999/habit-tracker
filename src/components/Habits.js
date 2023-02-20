/** @format */

import React, { useEffect, useRef } from "react";
// importing the useDispatch hook so that the reducer can be dispatched with data to change the state
import { useDispatch } from "react-redux";
// importing the deleteHabit and updateStatus reducers [function] from habitSlice
import { deleteHabit, updateStatus } from "../features/habitSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Habits({ habitName, habitDiscription, habitStatus, habitId }) {
	// We are getting habitName, habitDiscription, habitStatus, habitId as props from parent component i.e HabitContainer

	// using useDispatch hoot for dispatching data form the UI to redux store so that state can be updated accordingly
	// data which is begin send is known as payload and redux store can access the data
	const dispatch = useDispatch();

	const tableHeadRow = useRef();
	const tableStatusRow = useRef();

	useEffect(() => {
		// Code for highlighting the current date and its status
		const dates = document.getElementsByClassName("dates");
		const today = new Date();
		const todayDate = today.getDate();
		const dateArray = Object.values(dates).map((date) => date.textContent);
		// console.log(dateArray);
		const onlyDateArray = dateArray.map((date) => Number(date.slice(0, 2)));
		// console.log(onlyDateArray.indexOf(todayDate));
		tableHeadRow.current.children[onlyDateArray.indexOf(todayDate)].style.background =
			"purple";
		tableStatusRow.current.children[onlyDateArray.indexOf(todayDate)].style.background =
			"purple";

		// const dateArray = dates.map((date) => date.textContent);
		// console.log(dateArray);
	}, []);

	// This function is executed when any of the dates status has to be changed i.e none,done,fail
	const updateCompleteStatus = (e) => {
		// console.log(e.target.getAttribute("data-date"));
		// constructing the data object for updating the status of the date selected

		// console.log(Number(e.target.getAttribute("data-date").split("/")[0]));
		// let todayDate = new Date();
		// console.log(todayDate.getDate());

		let clickedDate = Number(e.target.getAttribute("data-date").split("/")[0]);
		let todayDate = new Date();
		if (clickedDate > todayDate.getDate()) {
			// alert("You can only change for current date. Not for future dates");
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
		const data = {
			date: e.target.getAttribute("data-date"),
			id: habitId,
		};

		// dispatching the data to redux store ; data is passed as an argument to updateStatus reducer [function]
		dispatch(updateStatus(data));
	};

	return (
		<div className="list-of-habits">
			<div className="habit-details">
				<div className="habit-name">{habitName}</div>
				<div className="habit-description">{habitDiscription}</div>
			</div>
			<div className="seven-days-of-week">
				<table>
					<thead>
						<tr ref={tableHeadRow}>
							{/* displaying the dates of the Last 7 day */}
							{Object.values(habitStatus).map((date, index) => (
								<th key={index} className="dates">
									{habitStatus[index].date}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr ref={tableStatusRow}>
							{/* Displaying the habit status of the last 7 day */}
							{Object.values(habitStatus).map((date, index) => (
								<td
									key={index}
									onClick={updateCompleteStatus}
									data-date={habitStatus[index].date}>
									{/* displaying the none, done or fail icon accoring to the state */}
									{habitStatus[index].status === "none" ? (
										<i className="fa-solid fa-check"></i>
									) : habitStatus[index].status === "done" ? (
										<i className="fa-solid fa-circle-check done"></i>
									) : (
										<i className="fa-solid fa-circle-xmark fail"></i>
									)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
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
