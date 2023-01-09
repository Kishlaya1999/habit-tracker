import React from "react";
// importing the useDispatch hook so that the reducer can be dispatched with data to change the state
import { useDispatch } from "react-redux";
// importing the deleteHabit and updateStatus reducers [function] from habitSlice
import { deleteHabit, updateStatus } from "../features/habitSlice";

function Habits({ habitName, habitDiscription, habitStatus, habitId }) {
	// We are getting habitName, habitDiscription, habitStatus, habitId as props from parent component i.e HabitContainer

	// using useDispatch hoot for dispatching data form the UI to redux store so that state can be updated accordingly
	// data which is begin send is known as payload and redux store can access the data
	const dispatch = useDispatch();

	// This function is executed when any of the dates status has to be changed i.e none,done,fail
	const updateCompleteStatus = (e) => {
		// console.log(e.target.getAttribute("data-date"));
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
			<div className="habit-details">
				<div className="habit-name">{habitName}</div>
				<div className="habit-description">{habitDiscription}</div>
			</div>
			<div className="seven-days-of-week">
				<table>
					<thead>
						<tr>
							{/* displaying the dates of the Last 7 day */}
							<th>{habitStatus[0].date}</th>
							<th>{habitStatus[1].date}</th>
							<th>{habitStatus[2].date}</th>
							<th>{habitStatus[3].date}</th>
							<th>{habitStatus[4].date}</th>
							<th>{habitStatus[5].date}</th>
							<th style={{ background: "purple" }}>{habitStatus[6].date}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* Displaying the habit status of the last 7 day */}
							<td onClick={updateCompleteStatus} data-date={habitStatus[0].date}>
								{/* displaying the none, done or fail icon accoring to the state */}
								{habitStatus[0].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[0].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[1].date}>
								{habitStatus[1].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[1].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[2].date}>
								{habitStatus[2].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[2].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[3].date}>
								{habitStatus[3].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[3].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[4].date}>
								{habitStatus[4].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[4].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[5].date}>
								{habitStatus[5].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[5].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
							<td onClick={updateCompleteStatus} data-date={habitStatus[6].date} style={{ background: "purple" }}>
								{habitStatus[6].status === "none" ? <i className="fa-solid fa-check"></i> : habitStatus[6].status === "done" ? <i className="fa-solid fa-circle-check done"></i> : <i className="fa-solid fa-circle-xmark fail"></i>}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* Delete button for deleting a habit */}
			{/* dispatching deleteHabit reducer with habitId as payload so that the selected habit can be deleted */}
			<div onClick={() => dispatch(deleteHabit(habitId))} className="delete-btn">
				<i className="fa-solid fa-trash"></i>
			</div>
		</div>
	);
}

export default Habits;
