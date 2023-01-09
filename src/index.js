import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// importing the store
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* Providing the redux store to the entire app */}
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
