import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Habits from "./Habits";
import { addHabit } from "../features/habitSlice";

function HabitContainer() {
	const [habit, setHabit] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const addYourHabitOnClick = () => {
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

		function Last7Days() {
			var today = new Date();
			var oneDayAgo = new Date(today);
			var twoDaysAgo = new Date(today);
			var threeDaysAgo = new Date(today);
			var fourDaysAgo = new Date(today);
			var fiveDaysAgo = new Date(today);
			var sixDaysAgo = new Date(today);

			oneDayAgo.setDate(today.getDate() - 1);
			twoDaysAgo.setDate(today.getDate() - 2);
			threeDaysAgo.setDate(today.getDate() - 3);
			fourDaysAgo.setDate(today.getDate() - 4);
			fiveDaysAgo.setDate(today.getDate() - 5);
			sixDaysAgo.setDate(today.getDate() - 6);

			var result0 = formatDate(today);
			var result1 = formatDate(oneDayAgo);
			var result2 = formatDate(twoDaysAgo);
			var result3 = formatDate(threeDaysAgo);
			var result4 = formatDate(fourDaysAgo);
			var result5 = formatDate(fiveDaysAgo);
			var result6 = formatDate(sixDaysAgo);

			var result = [result0, result1, result2, result3, result4, result5, result6];

			return result;
		}

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
		setDescription("");
		setHabit("");
		dispatch(addHabit(habitToBeAdded));
	};

	const data = useSelector((h) => {
		// console.log(c.habit.habits);
		return h.habit.habits;
	});

	const btnStyle = {
		backgroundColor: "#F10086",
		color: "white",
		fontSize: "1rem",
	};

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
					<button onClick={addYourHabitOnClick} style={btnStyle}>
						Add Habit
					</button>
				</section>
				{data.map((habit, index) => {
					return <Habits habitName={habit.title} habitDiscription={habit.description} habitStatus={habit.dates} habitId={habit.id} key={index} />;
				})}
			</div>
		</div>
	);
}

export default HabitContainer;
